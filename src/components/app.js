import React from 'react';
import '../assets/css/styles.css';
import '../assets/css/app.css';

const App = () => (
    <div className="app">
        <nav className="col-1 side-nav">
            Nav
        </nav>
        <div className="col-2">
            <header>
                Header
            </header>
            <main className="content">
            <section>
                <h1>SOME MAIN SECTION STUFF HERE</h1>
            </section>
            </main>
            <footer>
                Footer
            </footer>
        </div>
    </div>
);

export default App;
