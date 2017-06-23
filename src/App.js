import firebase from 'firebase';
import { Auth, Data } from './components';
import React, { Component } from 'react';
import { 
  Switch,
  Layout, Header, Textfield, Content, Menu, MenuItem , IconButton, Drawer, Navigation} from "react-mdl"

class App extends Component {
  constructor(props) {
    super(props)
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
      <div style={{ padding: '1em', fontSize: '2em', textAlign: 'center' }}>
        Please sign in with Facebook…
        <br /><br />
        <button onClick={this.signIn}>Sign in with Facebook</button>
      </div>
    )
  }

  renderApp = (user) => {
    if (!user) {
      return this.renderSignIn()
    }

    return (
      <div>
        Logged In
      </div>
    )
  }

  render() {
    return (
      <div className="App">
         <Layout fixedHeader>
          <Header title="PayWithFriends">
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
          <Content />
        </Layout>
        <Auth>{this.renderApp}</Auth>
      </div>
    );
  }
}

export default App;
