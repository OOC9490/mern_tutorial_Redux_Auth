import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    componentDidMount(){
        this.props.getItems();
    };

    _deleteClick = (id) => {
        this.props.deleteItem(id);
    };

    render() {
        const { items } = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        { items.map(item => (
                            <CSSTransition key={ item._id } timeout={ 500 } classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={ this._deleteClick.bind(this, item._id) }
                                    >
                                        &times;
                                    </Button>
                                    {item.name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    };
};

//actions from redux are stored as props within the component
ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired, // brings the state into the component
    item: PropTypes.object.isRequired // our state for shopping list 
};

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);