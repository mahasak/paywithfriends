import React, { Component } from 'react';
import { 
    Dialog, 
    DialogContent,
    DialogTitle,
    Textfield,
    DialogActions,
    Button
} from "react-mdl"

export class AddItemDialog extends React.Component {
    render() {
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
}