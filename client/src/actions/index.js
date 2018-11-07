import types from './types';
import axios from 'axios';
import { connect } from 'react-redux';

export function getListData(url){
    return async dispatch => {
        const resp = await axios.get(`/api/lists/${url}`);
        dispatch({
            type: types.GET_LIST_DATA,
            payload: resp
        })
        dispatch({
            type: types.LOGIN,
            payload: resp
        })
    }
}

export function addSingleItem(newItem){
    return async dispatch => {
        const resp = await axios.put('/api/newitem', newItem);
        dispatch({
            type: types.ADD_LIST_ITEM,
            payload: resp
        })
    }
}


export function createListData(userForm){
    return async dispatch => {
        const resp = await axios.put('/api/createlist', userForm);
        dispatch({
            type: types.CREATE_LIST_DATA,
            payload: resp
        })
    }
}

export function updateListData(listID){
    return async dispatch => {
        const resp = await axios.put('/api/updateuserlists', {listID} );
        dispatch({
            type: types.UPDATE_LIST_DATA,
            payload: resp
        })
    }
}

export function getListTitle(){
    return async dispatch => {
        const resp = await axios.get('/api/getuserlists');
        dispatch({
            type: types.GET_LIST_TITLE,
            payload: resp
        })
    }
}

export function sendCheckboxInfo(info){
    return async dispatch => {
        const resp = await axios.patch('/api/updateitem', info);
        console.log(resp)
        resp.data.disabled = false;
        dispatch({
            type: types.UPDATE_CHECKBOX,
            payload: resp
        })
    }
}

export function setCheckboxToInactive(){
    return dispatch => {
        dispatch({
            type: types.DISABLE_CHECKBOX,
            payload: {
                disabled: true
            }
        });
    }
}


export function authenticate(){
    return async dispatch => {
        const resp = await axios.get( '/auth/getuserinfo');
        dispatch({
            type: types.LOGIN,
            payload: resp
        })
    }
}

export function deleteItem(item){
    return async dispatch => {
        const resp = await axios.post('/api/deleteitem', item);
        dispatch({
            type: types.DELETE_SINGLE_ITEM,
            payload: resp
        })
    }
}

export function sendUserNotification(){
    return async dispatch => {
        const resp = await axios.patch('/api/notifications');
        dispatch({
            type: types.USER_NOTIFICATION,
            payload: resp
        })
    }
}

export function editSingleItem(item){
    return async dispatch => {
        const resp = await axios.patch('/api/updateitem', item);
        dispatch({
            type: types.EDIT_SINGLE_ITEM,
            payload: resp
        })
    }
}

