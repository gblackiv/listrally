import React from 'react';
import {Route} from 'react-router-dom';
//CSS stylesheets
import '../assets/css/styles.css';
import '../assets/css/app.css';
import '../assets/css/main.scss';
import '../assets/css/helpers.scss';
import '../assets/css/buttons.scss';
//Components
import TempNav from './tempNav';
import Home from './home';
import ListOwner from './list';
import ListShared from './shared-list';
import Dashboard from './dashboard';
import chatModal from './chat_modal';
import About from './about';
import UserSettings from './user_settings';
import Avatar from './avatar';

import LayoutTemplate from './layout';
import CreateList from './create-list';

const App = () => (
    <div className="app">
        <nav className="col-1 side-nav">
        <TempNav />
        </nav>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/create-list" component={CreateList} />
                    <Route path="/list" component={ListOwner} />
                    <Route path="/list-shared" component={ListShared} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/user-settings" component={UserSettings} />
                    <Route path="/chatmodal" component={chatModal} />
                    <Route path="/about" component={About} />

                    <Route path="/layout" component={LayoutTemplate} />

            
        </div>
);

export default App;
