import React, { Component } from 'react';
import { 
    Content,
    Dialog, 
    DialogContent,
    DialogTitle,
    Textfield,
    DialogActions,
    Button
} from "react-mdl"

export class AddItemDialog extends Component {
    render2() {
        return <Dialog open={this.props.stateOpenDialog} onCancel={this.props.handleCloseDialog}>
                    <DialogTitle>New Item</DialogTitle>
                    <DialogContent>
                        <Textfield
                            onChange={this.props.handleOnChange}
                            id="itemId"
                            name="item"
                            label="Item"
                            floatingLabel
                            style={{width: '200px'}}
                        />
                        <Textfield
                            onChange={this.props.handleOnChange}
                            pattern="-?[0-9]*(\.[0-9]+)?"error="Input is not a number!"
                            id="price"
                            name="price"
                            label="Price"
                            floatingLabel
                            style={{width: '200px'}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.props.handleAddItem}>Add</Button>
                        <Button type='button' onClick={this.props.handleCloseDialog}>Close</Button>
                    </DialogActions>
                </Dialog>
        
    }

    render() {
        return <Content>&nbsp;&nbsp;&nbsp;&nbsp;<Textfield
                            onChange={this.props.handleOnChange}
                            id="itemId"
                            name="item"
                            label="Item"
                            floatingLabel
                            style={{width: '180px'}}
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Textfield
                            onChange={this.props.handleOnChange}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="number only!!!"
                            id="price"
                            name="price"
                            label="Price"
                            floatingLabel
                            style={{width: '80px'}}
                        />&nbsp;&nbsp;
                        <Button raised accent onClick={this.props.handleAddItem}>Add</Button>
                        </Content>
    }
}