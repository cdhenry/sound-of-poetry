import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import Navigation from './pages/Navigation';
import Routes from './Routes';

library.add(faTimes)

function App(): JSX.Element {
    const history = createBrowserHistory()

    return (
        <Router history={history}>
            <section className="background h-screen">
                <nav className="absolute bg-transparent left-1/3 top-2 z-10">
                    <Navigation />
                </nav>
                <main className="h-screen overflow-y-auto">
                    <div className="flex flex-col items-center mt-16 h-full">
                        <Routes />
                    </div>
                </main>
            </section>
        </Router>
    )
}

export default App
