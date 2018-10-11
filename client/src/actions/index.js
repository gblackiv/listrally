import types from './types';
import axios from 'axios';
import checkbox from '../components/checkbox';

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


export function sendCheckboxInfo(info){
    console.log('checkbox Info:', info);
    return async dispatch => {
        const resp = await axios.patch('/api/updateitem', info);
        console.log('list resp :', resp);
        dispatch({
            type: types.UPDATE_CHECKBOX,
            payload: resp
        })
    }
}

export function authenticate(){
    return {
        type: types.LOGIN,
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