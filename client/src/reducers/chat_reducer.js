import types from '../actions/types';

const DEFAULT_STATE = {
    chat: [],
    message: {}
};

export default (state = DEFAULT_STATE, action) =>  {
    switch(action.type){
        case types.ADD_CHAT_MESSAGE:
            return {...state};
        case types.GET_CHAT_DATA:
            return {...state};
        default:
            return state;
    }
};