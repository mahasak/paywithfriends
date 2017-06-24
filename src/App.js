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

        this.state = { isSnackbarActive: false };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
        this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
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

    handleShowSnackbar() {
        this.setState({
        isSnackbarActive: true,
        btnBgColor: '#' +
            Math.floor(Math.random() * 0xFFFFFF).toString(16)
        });
    }

    handleTimeoutSnackbar() {
        this.setState({ isSnackbarActive: false });
    }

    handleClickActionSnackbar() {
        this.setState({
        btnBgColor: ''
        });
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
                    <a href="#">Sign Out</a>
                </Navigation>
            </Drawer>
            <Content>
                <List style={{width: '100%'}}>
                <ListItem twoLine>
                    <ListItemContent avatar="person" subtitle="62 THB">Prapat</ListItemContent>
                    <ListItemAction>
                    <a href="#"><Icon name="star" /></a>
                    </ListItemAction>
                </ListItem>
                <ListItem twoLine>
                    <ListItemContent avatar="person" subtitle="62 THB">Varokas</ListItemContent>
                    <ListItemAction>
                    <a href="#"><Icon name="star" /></a>
                    </ListItemAction>
                </ListItem>
                <ListItem twoLine>
                    <ListItemContent avatar="person" subtitle="62 THB">Max</ListItemContent>
                    <ListItemAction>
                    <a href="#"><Icon name="star" /></a>
                    </ListItemAction>
                </ListItem>
                </List>
                <DataTable selectable style={{ width: '100%'}}
                    shadow={0}
                    rows={[
                        {material: 'Acrylic (Transparent)', quantity: 25, price: 2.90},
                        {material: 'Plywood (Birch)', quantity: 50, price: 1.25},
                        {material: 'Laminate (Gold on Blue)', quantity: 10, price: 2.35}
                    ]}
                >
                    <TableHeader name="material" tooltip="The amazing material name">Items</TableHeader>
                    <TableHeader name="owner" tooltip="The amazing material name">Treat</TableHeader>
                    <TableHeader numeric name="price" cellFormatter={(price) => `\$${price.toFixed(2)}`} tooltip="Price pet unit">Price</TableHeader>
                </DataTable>
                <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent>
                    <Textfield
                        onChange={() => {}}
                        label="Item"
                        floatingLabel
                        style={{width: '200px'}}
                    />
                    <Textfield
                        onChange={() => {}}
                        label="Price"
                        floatingLabel
                        style={{width: '200px'}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='button' onClick={this.handleShowSnackbar}>Add</Button>
                    <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
                </DialogActions>
                </Dialog>
                <Snackbar
                active={this.state.isSnackbarActive}
                onClick={this.handleClickActionSnackbar}
                onTimeout={this.handleTimeoutSnackbar}
                action="Undo">Item Add.</Snackbar>               
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
