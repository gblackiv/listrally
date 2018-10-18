import types from '../actions/types';

const DEFAULT_STATE = {
    userInfo: {}
};

export default (state = DEFAULT_STATE, action) =>  {
    switch(action.type){
        case types.LOGIN:
            return {...state, userInfo: {...action.payload.data.user}};
        default:
            return state;
    }
};