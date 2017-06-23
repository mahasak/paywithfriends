import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import { FirebaseLogin } from './components';

class App extends Component {
  constructor(props) {
    super(props)
  }

  signIn = () => {
    var provider = new firebase.auth.FacebookAuthProvider()
    provider.setCustomParameters({ 'display': 'page' })
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <FirebaseLogin>{this.renderApp}</FirebaseLogin>
      </div>
    );
  }
}

export default App;
