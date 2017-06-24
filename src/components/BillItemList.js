import React, { Component } from 'react';
import { 
    DataTable, 
    TableHeader
} from "react-mdl"

export class BillItemList extends React.Component {
    render() {
        return <DataTable selectable style={{ width: '100%'}}
                    shadow={0}
                    rows={this.props.items}
                >
                    <TableHeader name="item" tooltip="รายการค่าใช้จ่าย">Items</TableHeader>
                    <TableHeader numeric name="price" cellFormatter={(price) => `\ ${price.toFixed(2)}`} tooltip="ราคา">Price</TableHeader>
                </DataTable>
    }
}
