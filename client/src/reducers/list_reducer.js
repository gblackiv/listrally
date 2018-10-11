import types from '../actions/types';

const DEFAULT_STATE = {
    items: [],
    list: [],
    item: {}
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type){
        case types.GET_LIST_DATA:
            console.log('action.payload.data :', action.payload.data);
            return {...state, items: action.payload.data.data.items, list: action.payload.data.data.list};
        case types.ADD_LIST_ITEM:
        console.log('Add Single Item action :', action);
            return {...state};
        case types.UPDATE_CHECKBOX:
            return {...state};
        case types.GET_SINGLE_ITEM:
            return {...state};
        case types.DELETE_SINGLE_ITEM:
            console.log('delete item action :', action);
            return {...state};
        case types.EDIT_SINGLE_ITEM:
            return {...state};
        case types.TOGGLE_COMPLETE:
            return {...state} ;
        default:
            return state;
    }
};