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
    constructor(props) {
        super(props)

        this.database = firebase.database()
        this.state = { 
            items: [],
            fields: [],
            payer: [],
            isSnackbarActive: false 
        };
    }

    componentDidMount = () => {
        let billId = 'id1'

        let payerRef = this.database.ref(`bills/${billId}/users`);
        let itemRef = this.database.ref(`bills/${billId}/items`);

        payerRef.on('value', this.onPayerUpdate, this.onPayerError)
        itemRef.on('value', this.onItemsUpdate, this.onItemsError)
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
        console.log(amount)
        console.log(payer)
        payer = payer.map((x)=>{
            x.amount = parseFloat(amount).toFixed(2)
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
        items.push({item: itemName, price: parseFloat(itemPrice)})
        var billId = 'id1'
        this.database.ref(`bills/${billId}/items`)
                              .push({name: itemName, own: "", price : parseInt(itemPrice)});
        this.setState({ items: items })
    }

    signIn = () => {
        console.log("Login")
        let provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithRedirect(provider).then(result => {
            let user = result.user
            console.log('Signed in!!')
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

    renderApp = (user) => {
        if (!user) {
            return this.renderSignIn()
        }

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

    render() {
        return (
        <div className="App">
            <Auth>{this.renderApp}</Auth>
        </div>
        );
    }
}

export default App;