import React, { Component } from 'react';
import { 
    Header, 
    IconButton,
    Menu,
    MenuItem
} from "react-mdl"

export class AppHeader extends Component {
    render() {
        return <Header title="PayWithFriends">
                <IconButton name="more_vert" id="demo-menu-lower-right" />
                <Menu target="demo-menu-lower-right" align="right">
                    <MenuItem>Notify Bills</MenuItem>
                </Menu>
            </Header>
    }
}