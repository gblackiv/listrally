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
    // return async dispatch => {
    //     const resp = await axios.put('/api/lists/newitem', newItem);
    //     console.log('list resp :', resp);
    //     dispatch({
    //         type: types.ADD_LIST_ITEM,
    //         payload: resp
    //     })
    // }
    return {
        type: types.ADD_LIST_ITEM
    }
}