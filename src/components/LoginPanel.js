import React, { Component } from 'react';
import { 
    Button
} from "react-mdl"

export class LoginPanel extends Component {

    render () {
        return <div style={{backgroundColor: "#2C98F0", top: 0}}>
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
                    <img src={this.props.logo} alt="logo"/><br/><br/>
                    Pay or Die !!!<br/>
                    <span style={{ fontSize: '14px'}}>
                    Filthy human, lol
                    </span>
                <br/><br/>
                <Button raised colored ripple onClick={this.props.onSignIn}>Sign in with Facebook</Button>
                </div>
                </div>
            </div>
    }
}

