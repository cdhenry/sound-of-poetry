import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleDown, faAngleDoubleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createBrowserHistory } from 'history';
import React, { useState } from 'react';
import { Router } from 'react-router-dom';

import Cart from './pages/Cart';
import Navigation from './pages/Navigation';
import Routes from './Routes';

library.add(faAngleDoubleLeft, faTimes)

function App(): JSX.Element {
    const history = createBrowserHistory()
    const [isAsideVisible, setIsAsideVisible] = useState(false)
    const [isNavVisible, setIsNavVisible] = useState(false)

    return (
        <Router history={history}>
            <section className="grid grid-cols-12 bg-coolGray-200">
                <section className={isAsideVisible ? 'col-span-10' : 'col-span-12'}>
                    <div className="absolute left-4 top-1">
                        <button className="" onClick={() => setIsNavVisible(!isNavVisible)}>
                            {!isNavVisible && <FontAwesomeIcon icon={faAngleDoubleDown} />}
                        </button>
                    </div>
                    {isNavVisible && (
                        <nav className="flex justify-center">
                            <Navigation handleCloseNav={() => setIsNavVisible(false)} />
                        </nav>
                    )}
                    <main>
                        <Routes />
                    </main>
                </section>
                <div className="absolute right-4 top-1">
                    <button className="" onClick={() => setIsAsideVisible(!isAsideVisible)}>
                        {isAsideVisible ? (
                            <FontAwesomeIcon icon={faTimes} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        )}
                    </button>
                </div>
                {isAsideVisible && (
                    <aside className="col-span-2 h-full bg-blueGray-500">
                        <Cart />
                    </aside>
                )}
            </section>
        </Router>
    )
}

export default App
