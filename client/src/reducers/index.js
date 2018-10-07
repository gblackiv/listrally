import { combineReducers } from 'redux';
import listReducer from './list_reducer';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
    list: listReducer,
    user: userReducer
});

export default rootReducer;