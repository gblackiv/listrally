import types from '../actions/types';

const DEFAULT_STATE = {
    items: [],
    list: [],
    item: {},
    allLists: [],
    listID: null,
    url: "",
    user: {},
    disabled: false
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type){
        case types.GET_LIST_DATA:
            return {...state, items: action.payload.data.data.items, list: action.payload.data.data.list};
        case types.ADD_LIST_ITEM:
            return {...state};
        case types.UPDATE_CHECKBOX:
            return {...state, disabled: action.payload.data.disabled};
        case types.DISABLE_CHECKBOX:
            return {...state, disabled: action.payload.disabled}
        case types.GET_SINGLE_ITEM:
            return {...state};
        case types.CREATE_LIST_DATA:
            return {...state, listID: action.payload.data.listID, url: action.payload.data.url};
        case types.DELETE_SINGLE_ITEM:
            return {...state};
        case types.EDIT_SINGLE_ITEM:
            return {...state};
        case types.TOGGLE_COMPLETE:
            return {...state} ;
        case types.GET_LIST_TITLE:
            return {...state, allLists: action.payload.data.data, user: action.payload.data} ;
        case types.DELETE_LIST:
            return {...state};
        case types.UPDATE_LIST_INFO:
            return {...state};
        default:
            return state;
    }
};