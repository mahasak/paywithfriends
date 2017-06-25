import React, { Component } from 'react';
import { 
    Header, 
    IconButton,
    Menu,
    MenuItem
} from "react-mdl"

export class AppHeader extends Component {

    copyUrl = () => {
        var Url = document.getElementById("url")
        Url.innerHTML = window.location.href;
        console.log(Url.innerHTML)
        Url.select();
        document.execCommand("copy");
    }

    render() {
        return <Header title="PayWithFriends">
                <IconButton name="more_vert" id="demo-menu-lower-right" />
                <Menu target="demo-menu-lower-right" align="right">
                    <MenuItem onClick={this.copyUrl}>Copy Link</MenuItem>
                    <MenuItem>Notify Bills</MenuItem>
                    <MenuItem>Reset</MenuItem>
                </Menu>
            </Header>
    }
}