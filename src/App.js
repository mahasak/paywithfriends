import firebase from 'firebase';
import React, { Component } from 'react';
import { 
    Content,
    Layout,
    Snackbar
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

function convertFromFirebase(data) {
        let emptyData = []
        if (data == null || data == undefined) {
            return []
        }

        let ids = Object.keys(data)
        return ids.map(id => {
            let beforeInfo = data[id]
            beforeInfo.id = id
            return beforeInfo
        })
}

class App extends Component {
    auth = firebase.auth()
    
    constructor(props) {
        super(props)
        console.log(this.auth.currentUser)
        this.database = firebase.database()
        this.state = { 
            user: this.auth.currentUser,
            billId: 'id1',
            amount: 0,
            items: [],
            fields: [],
            payer: [],
            isSnackbarActive: false 
        };
    }
    
    componentWillUnmount () {
        this.unsubscribe()
    }

    componentDidMount = () => {
        let billId = 'id1'

        let payerRef = this.database.ref(`bills/${billId}/users`);
        let itemRef = this.database.ref(`bills/${billId}/items`);

        payerRef.on('value', this.onPayerUpdate, this.onPayerError)
        itemRef.on('value', this.onItemsUpdate, this.onItemsError)

        this.auth.onAuthStateChanged(user => {
            this.setState({ user })
        })
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
        let summaryPrice = parseFloat((total * 1.1) + ((total* 1.1) * 0.07)).toFixed(2)
        let amount = summaryPrice / 2

        let updates = {};

        payer = payer.map((x)=>{
            
            x.amount = parseFloat(amount).toFixed(2)

            let postData = {
                amount: x.amount
            }
            updates['/bills/' + this.state.billId + '/users/'+  x.id] = postData;
            if (x.id == this.state.user.uid) {
                this.setState({amount : x.amount})
            }
        })

        this.setState({ items: items })
    }

    onItemsError = (error) => {
        //
    }

    getTotal = (items) => {
        if (items.length <= 0) return 0
        if (items.length == 1) return parseFloat(items[0].price)
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

    addItem = (itemName, itemPrice) => {
        var items = this.state.items.slice()
        items.push({name: itemName, price: parseFloat(itemPrice)})
        var billId = 'id1'
        this.database.ref(`bills/${billId}/items`)
                        .push({name: itemName, own: "", price : parseFloat(itemPrice)});
        this.setState({ items: items })
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
                billID: 'id1'
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
                
            updates['/bills/'+billId+'/users/' + this.state.user.uid] = billUpdates;

            this.database.ref().update(updates);
        }
    }

    renderApp = (user) => {
        if (!user) {
            return this.renderSignIn()
        }
        else
        {
            let billId = 'id1'
            this.updateUserProfile(user, billId)
            this.addcurrentUserToBill(billId)
            
            return (
                <Layout fixedHeader>
                    <AppHeader onOpenNewItemDialog={this.handleOpenDialog} />
                    <AppMenu onSignOut={this.signOut}/>
                    <Content>
                        <BillPayer payer={this.state.payer} />
                        <BillItemList items={this.state.items} />
                        <AddItemDialog 
                            stateOpenDialog={this.state.openDialog} 
                            handleCloseDialog={this.handleCloseDialog}
                            handleOnChange={this.handleOnChange}
                            handleAddItem={this.handleAddItem}
                        />
                        <Snackbar
                            active={this.state.isSnackbarActive}
                            onClick={this.handleClickActionSnackbar}
                            onTimeout={this.handleTimeoutSnackbar}
                        >Item Add.</Snackbar>               
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