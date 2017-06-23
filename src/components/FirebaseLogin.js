/** 
 * Credit to @dtinth (Thai Pang) for original library
*/

import * as firebase from 'firebase'
import React from 'react'

export class FirebaseLogin extends React.Component {
  auth = firebase.auth()
  state = {
    user: this.auth.currentUser
  }
  componentDidMount () {
    this.unsubscribe = this.auth.onAuthStateChanged(user => {
      this.setState({ user })
    })
  }
  componentWillUnmount () {
    this.unsubscribe()
  }
  render () {
    return this.props.children(this.state.user)
  }
}