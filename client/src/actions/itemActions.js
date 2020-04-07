import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items/').then(response => dispatch({
            type: GET_ITEMS,
            payload: response.data
    }))
    .catch( error => dispatch(returnErrors(error.response.data, error.response.status )));
};

export const addItem = (item) => (dispatch, getState )=> {
    axios.post('/api/items/add', item, tokenConfig(getState)).then(response => dispatch({
            type: ADD_ITEM,
            payload: response.data
    }))
    .catch( error => dispatch(returnErrors(error.response.data, error.response.status )));
};

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/items/delete/${id}`, tokenConfig(getState)).then(response => dispatch({
            type: DELETE_ITEM,
            payload: id
    }))
    .catch( error => dispatch(returnErrors(error.response.data, error.response.status )));
};


export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}