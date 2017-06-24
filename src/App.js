import firebase from 'firebase';
import { Auth, Data } from './components';
import React, { Component } from 'react';
import { 
    Button,
    DataTable,
    TableHeader,
    List,
    ListItem,
    Snackbar,
    Dialog, DialogTitle,
    DialogContent, DialogActions,
    ListItemContent,
    ListItemAction,
    Icon,
    Switch,
    Layout, 
    Header, 
    Textfield, 
    Content, 
    Menu, 
    MenuItem , 
    IconButton, 
    Drawer, 
    Navigation
} from "react-mdl"
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
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
        this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
    }

    handleOnChange = (e,val) => {
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({fields: fields})
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
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

    handleShowSnackbar() {
        this.setState({
            isSnackbarActive: true,
            btnBgColor: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
        });
    }

    handleTimeoutSnackbar() {
        this.setState({ 
            isSnackbarActive: false 
        });
    }

    handleClickActionSnackbar() {
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
            var user = result.user
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
            <div style={{backgroundColor: "#2C98F0", top: 0}}>
                <div style={{ 
                    padding: '1em', 
                    fontSize: '2em', 
                    textAlign: 'center', 
                    position: 'absolute' , 
                    top:0 ,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: '#FFFFFF',
                    backgroundColor: '#2C98F0',
                    margin: 'auto' }}>
                    <div >
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <img src={logo} /><br/><br/>
                    Pay or Die !!!<br/>
                    <span style={{ fontSize: '14px'}}>
                    Filthy human, lol
                    </span>
                <br/><br/>
                <Button raised colored ripple onClick={this.signIn}>Sign in with Facebook</Button>
                </div>
                </div>
            </div>
        )
    }

    renderApp = (user) => {
        if (!user) {
            return this.renderSignIn()
        }

        return (
        <Layout fixedHeader>
            <Header title="PayWithFriends">
                <Button raised accent ripple onClick={this.handleOpenDialog}>Add</Button>
                <IconButton name="more_vert" id="demo-menu-lower-right" />
                <Menu target="demo-menu-lower-right" align="right">
                    <MenuItem>Copy Link</MenuItem>
                    <MenuItem>Notify Bills</MenuItem>
                    <MenuItem>Reset</MenuItem>
                </Menu>
            </Header>
            <Drawer title="Pay With Friends">
                <Navigation>             
                    <dl>
                    <dt>
                        <Switch ripple id="service" defaultChecked>Service Charge</Switch>
                    </dt>
                    </dl>
                    <dl>
                    <dt>
                        <Switch ripple id="vat" defaultChecked>VAT</Switch>
                    </dt>
                    </dl>
                    <a href="#">Create New Bill</a>
                    <a href="#" onClick={this.signOut} >Sign Out</a>
                </Navigation>
            </Drawer>
            <Content>
                <BillPayer payer={this.state.payer} />
                <DataTable selectable style={{ width: '97%'}}
                    shadow={0}
                    rows={this.state.items}
                >
                    <TableHeader name="item" tooltip="รายการค่าใช้จ่าย">Items</TableHeader>
                    <TableHeader name="owner" tooltip="ใครจะเหมาจ่าย">Treat</TableHeader>
                    <TableHeader numeric name="price" cellFormatter={(price) => `\ ${price.toFixed(2)}`} tooltip="ราคา">Price</TableHeader>
                </DataTable>
                <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent>
                    <Textfield
                        onChange={this.handleOnChange}
                        id="itemId"
                        name="item"
                        label="Item"
                        floatingLabel
                        style={{width: '200px'}}
                    />
                    <Textfield
                        onChange={this.handleOnChange}
                        id="price"
                        name="price"
                        label="Price"
                        floatingLabel
                        style={{width: '200px'}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='button' onClick={this.handleAddItem}>Add</Button>
                    <Button type='button' onClick={this.handleCloseDialog}>Close</Button>
                </DialogActions>
                </Dialog>
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

class BillPayer extends React.Component {

    render () {
        const payer = this.props.payer
        
        return <List style={{width: '95%', margin: 0}}>
              {payer.map(function(object,i) {
                  return <ListItem key={object.id} twoLine>
                    <ListItemContent avatar="person" subtitle={object.amount}>{object.name}</ListItemContent>
                </ListItem>
              })}
        </List>
    }
}

export default App;
