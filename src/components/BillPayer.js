import React, { Component } from 'react';
import { 
    List, 
    ListItem,
    ListItemContent
} from "react-mdl"

export class BillPayer extends Component {

    render () {
        const payer = this.props.payer
        
        return <List style={{width: '95%', margin: 0}}>
              {payer.map(function(object,i) {
                  return <ListItem key={object.id} twoLine>
                    <ListItemContent avatar="person" subtitle={object.amount}>{object.name}</ListItemContent>
                </ListItem>
              })}
        </List>
    }
}