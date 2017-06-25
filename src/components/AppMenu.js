import React, { Component } from 'react';
import { 
    Drawer, 
    Navigation,
    Switch
} from "react-mdl"

export class AppMenu extends Component {
    
    render() {
        return <Drawer title="Pay With Friends">
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
                    <a href="#" onClick={this.props.onCreateNew}>Create New Bill</a>
                    <a href="#" onClick={this.props.onSignOut} >Sign Out</a>
                </Navigation>
            </Drawer>
    }
}