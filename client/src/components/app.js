import React from 'react';
import {Route} from 'react-router-dom';
//CSS stylesheets
import '../assets/css/styles.css';
import '../assets/css/app.css';
import '../assets/css/main.scss';
import '../assets/css/buttons.scss';
//Components
import TempNav from './tempNav';
import Header from './header';
import Home from './home';
import ListOwner from './list';
import ListShared from './shared-list';
import Dashboard from './dashboard';
import chatModal from './chat_modal';
import About from './about';
import UserSettings from './user_settings';

import LayoutTemplate from './layout';

const App = () => (
    <div className="app">
        <nav className="col-1 side-nav">
        <TempNav />
        </nav>
        <div className="col-2">
            <header>
                <Header />
            </header>
            <main className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/list" component={ListOwner} />
                    <Route path="/list-shared" component={ListShared} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/user-settings" component={UserSettings} />
                    <Route path="/chatmodal" component={chatModal} />
                    <Route path="/about" component={About} />

                    <Route path="/layout" component={LayoutTemplate} />
            </main>
            <footer>
                <p>Footer Component Here</p>
            </footer>
        </div>
    </div>
);

export default App;
