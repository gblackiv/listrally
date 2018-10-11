import types from './types';
import axios from 'axios';

export function getListData(){
    return async dispatch => {
        const resp = await axios.get('/api/lists?url=ourfirstdummylist');
        console.log('list resp :', resp);
        dispatch({
            type: types.GET_LIST_DATA,
            payload: resp
        })
    }
}

export function addSingleItem(newItem){
    console.log('newItem :', newItem);
    return async dispatch => {
        const resp = await axios.put('/api/newitem', newItem);
        console.log('list resp :', resp);
        dispatch({
            type: types.ADD_LIST_ITEM,
            payload: resp
        })
    }
}

export function createListData(userForm){
    return async dispatch => {
        const resp = await axios.put('/api/createlist', userForm);
        console.log('create list resp :', resp);
        dispatch({
            type: types.CREATE_LIST_DATA,
            payload: resp
        })
    }
}

export function getListTitle(){
    return async dispatch => {
        const resp = await axios.get('/api/getuserlists?ID=1');
        console.log('list title resp :', resp);
        dispatch({
            type: types.GET_LIST_TITLE,
            payload: resp
        })
    }
}