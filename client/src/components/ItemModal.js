import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    _handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    _handleSubmit = (event) => {
        event.preventDefault();

        const newItem = {
            name: this.state.name
        };

        // Add item via addItem action in the item reducer
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    };

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? <Button
                    color="dark"
                    style={ {marginBottom: '2rem'} }
                    onClick={ this.toggle }
                >Add Item</Button> : <h4 className="mb-3 ml-4">Please log in to manage items.</h4> }
                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                >
                    <ModalHeader toggle={ this.toggle }>Add to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this._handleSubmit }>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={ this._handleChange } 
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);