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