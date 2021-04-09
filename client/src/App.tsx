import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import Drawer from './pages/Drawer';
import Navigation from './pages/Navigation';
import Routes from './Routes';

library.add(faTimes)

function App(): JSX.Element {
    const history = createBrowserHistory()

    return (
        <Router history={history}>
            <section className="background flex bg-coolGray-200 min-h-screen">
                <section className="flex-grow">
                    <Navigation />
                    <main>
                        <Routes />
                    </main>
                </section>
                <Drawer />
            </section>
        </Router>
    )
}

export default App
