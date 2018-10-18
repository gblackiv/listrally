import types from './types';
import axios from 'axios';
import { connect } from 'react-redux';

export function getListData(url){
    return async dispatch => {
        const resp = await axios.get(`/api/lists/${url}`);
        console.log('list resp :', resp);
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
    console.log('newItem :', newItem);
    return async dispatch => {
        const resp = await axios.put('/api/newitem', newItem);
        console.log('Create new list item resp :', resp);
        dispatch({
            type: types.ADD_LIST_ITEM,
            payload: resp
        })
    }
}


export function createListData(userForm){
    console.log('New list data sent to server :', userForm);
    return async dispatch => {
        const resp = await axios.put('/api/createlist', userForm);
        console.log('create new list response from server :', resp);
        dispatch({
            type: types.CREATE_LIST_DATA,
            payload: resp
        })
    }
}

export function updateListData(listID){
    console.log('List added to the dashboard:', listID);
    return async dispatch => {
        const resp = await axios.put('/api/updateuserlists', {listID} );
        console.log('Adding list to dashboard response from server :', resp);
        dispatch({
            type: types.UPDATE_LIST_DATA,
            payload: resp
        })
    }
}


export function getListTitle(){
    return async dispatch => {
        const resp = await axios.get('/api/getuserlists');
        console.log('list title resp :', resp);
        dispatch({
            type: types.GET_LIST_TITLE,
            payload: resp
        })
    }
}

export function sendCheckboxInfo(info){
    console.log('checkbox Info:', info);
    return async dispatch => {
        const resp = await axios.patch('/api/updateitem', info);
        console.log('Update Checkbox resp :', resp);
        dispatch({
            type: types.UPDATE_CHECKBOX,
            payload: resp
        })
    }
}

export function authenticate(){
    return async dispatch => {
        const resp = await axios.get( '/auth/getuserinfo');
        console.log('Google login resp :', resp);
        dispatch({
            type: types.LOGIN,
            payload: resp
        })
    }
}

export function deleteItem(item){
    console.log('Deleted Item Inside Action Creator :', item);
    return async dispatch => {
        const resp = await axios.post('/api/deleteitem', item);
        console.log('Delete item resp :', resp);
        dispatch({
            type: types.DELETE_SINGLE_ITEM,
            payload: resp
        })
    }
}

export function sendUserNotification(){
    return async dispatch => {
        const resp = await axios.patch('/api/notifications');
        console.log('User Notification resp :', resp);
        dispatch({
            type: types.USER_NOTIFICATION,
            payload: resp
        })
    }
}

export function editSingleItem(item){
    console.log('Update Item Info:', item);
    return async dispatch => {
        const resp = await axios.patch('/api/updateitem', item);
        console.log('Edit Item resp :', resp);
        dispatch({
            type: types.EDIT_SINGLE_ITEM,
            payload: resp
        })
    }
}

