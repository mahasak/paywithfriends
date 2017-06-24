import React, { Component } from 'react';
import { 
    Header, 
    Button,
    IconButton,
    Menu,
    MenuItem
} from "react-mdl"

export class AppHeader extends React.Component {
    render() {
        return <Header title="PayWithFriends">
                <Button raised accent ripple onClick={this.props.onOpenNewItemDialog}>Add</Button>
                <IconButton name="more_vert" id="demo-menu-lower-right" />
                <Menu target="demo-menu-lower-right" align="right">
                    <MenuItem>Copy Link</MenuItem>
                    <MenuItem>Notify Bills</MenuItem>
                    <MenuItem>Reset</MenuItem>
                </Menu>
            </Header>
    }
}