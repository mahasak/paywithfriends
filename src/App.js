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

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            items: [],
            fields: [],
            payer: [
                {id:1, name: "Prapat Sumlee", amount: 100},
                {id:2, name: "Mahasak P", amount: 100},
            ],
            isSnackbarActive: false 
        };
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
        items.push({item: itemName, price: parseFloat(itemPrice)},)
        console.log(items)
        this.setState({ items: items })
    }

    signIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithRedirect(provider).then(result => {
            //var user = result.user
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
            <LoginPanel logo={logo} onSignin={this.signIn} />
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