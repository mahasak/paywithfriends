import React, { Component } from 'react';
import { 
    DataTable, 
    Icon,   
    List, 
    ListItem,
    ListItemAction,
    ListItemContent,
    TableHeader
} from "react-mdl"

export class BillItemList extends Component {
    render1() {
        return <DataTable selectable style={{ width: '100%'}}
                    shadow={0}
                    rows={this.props.items}
                >
                    <TableHeader name="name" tooltip="รายการค่าใช้จ่าย">Items</TableHeader>
                    <TableHeader numeric name="price" cellFormatter={(price) => price.toFixed(2) } tooltip="ราคา">Price</TableHeader>
                </DataTable>
    }

    onDelete = (id) => {
        console.log(`delete ${id}`)
    }

    render() {
        var lis = [];

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
