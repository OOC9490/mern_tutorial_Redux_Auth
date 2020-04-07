import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    ModalBody,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from  '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    // Check for error state in props
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if( error !== prevProps.error ){
            if( error.id === 'REGISTER_FAIL' ){
                this.setState({ msg: error.msg.msg });
            }else{
                this.setState({ msg: null });
            };
        };

        // if registration is successful and user is authenticated, close modal
        if( this.state.modal ) {
            if (isAuthenticated){
                this.toggle();
            };
        };
    };

    toggle = () => {
        // Clear any errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    _handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    _handleSubmit = (event) => {
        event.preventDefault();

        const { name, email, password } = this.state;

        // Create a user object
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser)

        // Close modal
        // this.toggle();
    };

    render() {
        return(
            <div>
                <NavLink onClick={ this.toggle } href="#">
                    Register
                </NavLink>
                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                >
                    <ModalHeader toggle={ this.toggle }>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={ this._handleSubmit }>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Name"
                                    onChange={ this._handleChange } 
                                    className="mb-3"
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={ this._handleChange }
                                    className="mb-3"
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={ this._handleChange } 
                                    className="mb-3"
                                />
                                
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Register
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);