import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './Routes';

function App(): JSX.Element {
    const history = createBrowserHistory()

    return (
        <Router history={history}>
            <Routes />
        </Router>
    )
}

export default App
