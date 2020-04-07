import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING } );

    // fetch the user, constantly makes a request for the token
    axios.get('/api/auth/user', tokenConfig(getState))
        .then( response => dispatch({
            type: USER_LOADED,
            payload: response.data
        }))
        .catch( error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// Register User
export const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users/add', body, config)
        .then(response => dispatch({
            type:REGISTER_SUCCESS,
            //sends the user data and token via payload
            payload: response.data
        }))
        .catch( error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// Login user
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(response => dispatch({
            type:LOGIN_SUCCESS,
            //sends the user data and token via payload
            payload: response.data
        }))
        .catch( error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// Logout user

export const logout = () => {
    return {
        type:LOGOUT_SUCCESS
    };
};

// Set up config/headers and token
// get token from local storage
export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token

    // Headers
    const config = {
        headers:{
            "Content-type": "application/json"
        }
    };

    // if there is an existing token, add to headers
    if( token ){
        config.headers['x-auth-token'] = token;
    };

    return config;
}

