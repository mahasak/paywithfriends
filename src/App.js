import firebase from 'firebase';
import { Auth, Data } from './components/FirebaseReact';

import React, { Component } from 'react';
import './App.css';

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
        <div className="App-header">
          
          <h2>Welcome to React</h2>
        </div>
        <Auth>{this.renderApp}</Auth>
      </div>
    );
  }
}

export default App;
