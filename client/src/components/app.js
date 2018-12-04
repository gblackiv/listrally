import React from 'react';
import {Route} from 'react-router-dom';
//CSS stylesheets
import '../assets/css/styles.css';
import '../assets/css/main.scss';
import '../assets/css/helpers.scss';
import '../assets/css/buttons.scss';
//Components
import Home from './home';
import ListOwner from './owner-list';
import ListShared from './shared-list';
import Dashboard from './dashboard';
import chatModal from './chat_modal';
import About from './about';
import UserSettings from './user_settings';
import createListItem from './owner-list-item'
import Auth from '../hoc/auth';

import LayoutTemplate from './layout';
import CreateList from './create-list';

const App = (props) => (
    <div className="app">
        <Route exact path="/" component={Home} />
        <Route exact path="/create-list" component={CreateList} />
        <Route path="/list/:url" component={ListOwner} />
        <Route path="/list-shared/:url" component={ListShared} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/user-settings" component={UserSettings} />
        <Route path="/chatmodal" component={chatModal} />
        <Route path="/about" component={About} />
        <Route path="/layout" component={LayoutTemplate} />  
        <Route path="/item/:itemID" component={createListItem} />       
    </div>
);

export default App;
