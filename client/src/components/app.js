import React from 'react';
import {Route} from 'react-router-dom';
//CSS stylesheets
import '../assets/css/styles.css';
import '../assets/css/app.css';
//Components
import TempNav from './tempNav';
import Home from './home';
import ListOwner from './list';
import ListShared from './shared-list';
import Dashboard from './dashboard';
import chatModal from './chat_modal';
import About from './about';
import UserSettings from './user_settings';
import Header from './header';

const App = () => (
    <div className="app">
        <nav className="col-1 side-nav">
        <TempNav />
        </nav>
        <div className="col-2">
            <main className="content">
                <Route exact path="/" component={Home} />
                <Route path="/list" component={ListOwner} />
                <Route path="/list-shared" component={ListShared} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/user-settings" component={UserSettings} />
                <Route path="/chatmodal" component={chatModal} />
                <Route path="/about" component={About} />
            </main>
        </div>
    </div>
);

export default App;
