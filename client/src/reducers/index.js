import { combineReducers } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import listReducer from './list_reducer';
import userReducer from './user_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
    list: listReducer,
    user: userReducer,
    chat: chatReducer,
    form: formReducer//you need this to be able to type in to redux-form
});

export default rootReducer;