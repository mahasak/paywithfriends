import React, { Component } from 'react';
import { 
    Icon,   
    List, 
    ListItem,
    ListItemAction,
    ListItemContent
} from "react-mdl"

export class BillItemList extends Component {
    render() {

        return <List style={{width: '100%'}}>
            {this.props.items.map(function(object,i) {
                  return <ListItem key={object.id} 
                                style={{ backgroundColor: '#919191',color:'#FFFFFF'}}
                                twoLine>
                    <ListItemContent avatar="pizza" subtitle={object.price}>{object.name}</ListItemContent>
                    <ListItemAction >
                            <a href="#" onClick={ (id) => {this.props.onDelete(object.id)}}><Icon name="delete" /></a>
                    </ListItemAction>
                </ListItem>
              }, this)}
                    </List>
    }
}
