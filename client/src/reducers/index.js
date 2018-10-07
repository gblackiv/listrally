import { combineReducers } from 'redux';
import listReducer from './list_reducer';
import userReducer from './user_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
    list: listReducer,
    user: userReducer,
    chat: chatReducer,
});

export default rootReducer;