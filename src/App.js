import firebase from 'firebase';
import React, { Component } from 'react';
import { 
    Content,
    Layout,
    Snackbar,
    Textfield
} from "react-mdl"
import { 
    AddItemDialog,
    AppHeader,
    AppMenu,
    Auth, 
    BillItemList,
    BillPayer,
    LoginPanel
} from './components';
import logo from './logo.png';
import './App.css'

function convertFromFirebase(data) {
        if (data === null || data === undefined) {
            return []
        }

        let ids = Object.keys(data)
        return ids.map(id => {
            let beforeInfo = data[id]
            beforeInfo.id = id
            return beforeInfo
        })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class App extends Component {
    auth = firebase.auth()
    
    constructor(props) {
        super(props)
        this.database = firebase.database()
        const billId = getUrlParameter('bill')
        if (!billId) {
            console.log("no id")
            var nextBillId = this.database.ref('bills').push().key;
            window.location.href = "?bill="+nextBillId
        }
        this.state = { 
            user: this.auth.currentUser,
            billId: billId,
            link: `https://paywithfriends-e917e.firebaseapp.com/?bill=${billId}`,
            amount: 0,
            vat: true,
            serviceCharge: true,
            items: [],
            fields: [],
            payer: [],
            isSnackbarActive: false ,
            isSnackbarCopy: false 
        };
    }
    
    componentWillUnmount () {
        this.unsubscribe()
    }

    componentDidMount = () => {
        let payerRef = this.database.ref(`bills/${this.state.billId}/users`);
        let itemRef = this.database.ref(`bills/${this.state.billId}/items`);

        payerRef.on('value', this.onPayerUpdate, this.onPayerError)
        itemRef.on('value', this.onItemsUpdate, this.onItemsError)

        this.auth.onAuthStateChanged(user => {
            this.setState({ user })
        })
    }

    createNewBill = () => {
        var nextBillId = this.database.ref('bills').push().key;
        window.location.href = "?bill="+nextBillId
    }
    

    onPayerUpdate = (snapshot) => {
        let payer = convertFromFirebase(snapshot.val())
        this.setState({ payer: payer })
    }

    onPayerError = (error) => {
        //
    }

    onItemsUpdate = (snapshot) => {
        let payer = this.state.payer
        let items = convertFromFirebase(snapshot.val())
        let total = this.getTotal(items)
        let sc = this.state.serviceCharge ? 1.1 : 1;
        let vat = this.state.vat ? 0.07 : 0;
        let summaryPrice = parseFloat((total * sc) + ((total* sc) * vat)).toFixed(2)
        let amount = summaryPrice / payer.length

        let updates = {};

        payer = payer.map((x)=>{
            
            x.amount = parseFloat(amount).toFixed(2)

            let postData = {
                amount: x.amount
            }

            updates[`/bills/${this.state.billId}/users/${x.id}`] = postData;

            if (x.id === this.state.user.uid) {
                this.setState({amount : x.amount})
            }

            return x
        })

        this.setState({ items: items })
    }

    onItemsError = (error) => {
        //
    }

    getTotal = (items) => {
        if (items.length <= 0) return 0
        if (items.length === 1) return parseFloat(items[0].price)
        let tmp = items.reduce((a,b) => {
            return {price: parseFloat(a.price) + parseFloat(b.price)} 
        })
        return tmp.price
    }

    handleOnChange = (e,val) => {
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({fields: fields})
    }

    handleOpenDialog = () => {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog = () => {
        this.setState({
            openDialog: false
        });
    }

    handleAddItem = () => {
        this.addItem(this.state.fields.item, this.state.fields.price)
        document.getElementById("itemId").value = ''
        document.getElementById("price").value = ''
        this.setState({
            openDialog: false
        });
        this.handleShowSnackbar()
    }

    handleShowSnackbar = () => {
        this.setState({
            isSnackbarActive: true,
            btnBgColor: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
        });
    }

    handleTimeoutSnackbar = () => {
        this.setState({ 
            isSnackbarActive: false 
        });
    }

    handleClickActionSnackbar = () => {
        this.setState({
            btnBgColor: ''
        });
    }

    handleShowCopy = () => {
        this.setState({
            isSnackbarCopy: true,
            btnBgColor: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
        });
    }

    handleTimeoutCopy = () => {
        this.setState({ 
            isSnackbarCopy: false 
        });
    }

    handleClickActionCopy = () => {
        this.setState({
            btnBgColor: ''
        });
    }

    addItem = (itemName, itemPrice) => {
        var items = this.state.items.slice()
        var newPostKey = this.database.ref(`bills/${this.state.billId}/items`).push().key;
        items.push({id: newPostKey, name: itemName, price: parseFloat(itemPrice)})
        this.database.ref(`bills/${this.state.billId}/items/${newPostKey}`)
                        .update({name: itemName, own: "", price : parseFloat(itemPrice)});
        this.setState({ items: items })
    }

    removeItem = (id) => {
        this.database.ref(`/bills/${this.state.billId}/items/${id}`).remove()
    }

    signIn = () => {
        console.log("Login")
        let provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithRedirect(provider).then(result => {
            
            console.log('Sign In');
            
        }).catch(error => {
            alert('Cannot sign in: ' + String(error))
        })
    }

    signOut = () => {
        firebase.auth().signOut().then(function() {
            console.log('Sign out!!')
        }).catch(function(error) {
            alert('Cannot sign out')
        })
    }

    renderSignIn = () => {
        return (
            <LoginPanel logo={logo} onSignIn={this.signIn} />
        )
    }

    updateUserProfile = (user, billId) => {
        let postData = {
                name: user.displayName,
                billID: this.state.billId
        }
            
        let updates = {};
            
        updates['/users/' + user.uid] = postData;

        this.database.ref().update(updates);
    }


    addcurrentUserToBill = (billId) => {
        if (this.state.user) {
            let billUpdates = {
                amount: 0,
                name: this.state.user.displayName
            };

            let updates = {}
                
            updates[`/bills/${billId}/users/` + this.state.user.uid] = billUpdates;

            this.database.ref().update(updates);
        }
    }

    renderApp = (user) => {
        if (!user) {
            return this.renderSignIn()
        }
        else
        {
            this.updateUserProfile(user, this.state.billId)
            this.addcurrentUserToBill(this.state.billId)
            
            return (
                <Layout fixedHeader>
                    
                    <AppHeader onOpenNewItemDialog={this.handleOpenDialog} />
                    <AppMenu 
                        serviceCharge={this.state.serviceCharge}
                        vat={this.state.vat}
                        onServiceChange={()=>{ this.setState({serviceCharge: !this.state.serviceCharge}) }}
                        onVatChange={()=>{ this.setState({vat: !this.state.vat}) }}
                        onSignOut={this.signOut} 
                        onCreateNew={this.createNewBill} />
                    <Content>
                        &nbsp;&nbsp;&nbsp;&nbsp;<Textfield
                            id="urlText"
                            onChange={() => {}}
                            onClick={() => {
                                document.getElementById("urlText").select();
                                document.execCommand("copy");
                                this.handleShowCopy()
                            }}
                            value={this.state.link}
                            label="Link (Click to copy &amp; share)"
                            floatingLabel
                        />
                        <AddItemDialog 
                            stateOpenDialog={this.state.openDialog} 
                            handleCloseDialog={this.handleCloseDialog}
                            handleOnChange={this.handleOnChange}
                            handleAddItem={this.handleAddItem}
                        />
                        <BillPayer payer={this.state.payer} />
                        <BillItemList items={this.state.items} onDelete={this.removeItem} />
                        
                        <textarea style={{display: 'none'}} id="url" rows="1" cols="30"></textarea>
                        <Snackbar
                            active={this.state.isSnackbarActive}
                            onClick={this.handleClickActionSnackbar}
                            onTimeout={this.handleTimeoutSnackbar}
                        >Item Add.</Snackbar>
                        <Snackbar
                            active={this.state.isSnackbarCopy}
                            onClick={this.handleClickActionCopy}
                            onTimeout={this.handleTimeoutCopy}
                        >Url Copied</Snackbar>               
                    </Content>
                    </Layout>
                )
        }
    }
      

    render() {
        return (
        <div className="App">
            <Auth>{this.renderApp}</Auth>
        </div>
        );
    }
}

export default App;