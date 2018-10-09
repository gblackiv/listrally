import types from '../actions/types';

const DEFAULT_STATE = {
    list: [],
    item: {}
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type){
        case types.GET_LIST_DATA:
            return {...state, list: action.payload.data.data.items};
        case types.GET_SINGLE_ITEM:
            return {...state};
        case types.DELETE_SINGLE_ITEM:
            return {...state};
        case types.EDIT_SINGLE_ITEM:
            return {...state};
        case types.TOGGLE_COMPLETE:
            return {...state} ;
        default:
            return state;
    }
};