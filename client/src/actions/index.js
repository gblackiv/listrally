import types from './types';
import axios from 'axios';
import { connect } from 'react-redux';

export function getListData(url){
    return async dispatch => {
        const resp = await axios.get(`/api/lists/${url}`);
        debugger;

        const preConvertedDate = new Date( resp.data.data.list[0].eventTime );
        const convertedDate = new Date(preConvertedDate.getTime());

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const month = monthNames[convertedDate.getMonth()];
        resp.data.data.list[0].eventTime = convertedDate;
        resp.data.data.list[0].userTimeFormat = `${month} ${convertedDate.getDate()}, ${convertedDate.getFullYear()} ${convertedDate.toLocaleTimeString()}`;
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


export function createListData(userForm, callbackFunction){
    return async dispatch => {
        const resp = await axios.put('/api/createlist', userForm);
        dispatch({
            type: types.CREATE_LIST_DATA,
            payload: resp
        })
        callbackFunction();
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

export function deleteList(ID, callbackFunction){
    return async dispatch => {
        const resp = await axios.patch( '/api/deletelist', {ID} );
        callbackFunction();
        dispatch({
            type: types.DELETE_LIST,
            payload: resp
        });
    }
}

