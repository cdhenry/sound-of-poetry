import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import Drawer from './pages/Drawer'
import Navigation from './pages/Navigation'
import Routes from './Routes'

library.add(faTimes)

function App(): JSX.Element {
    const history = createBrowserHistory()

    return (
        <Router history={history}>
            <section className="background h-screen overflow-y-hidden">
                <nav className="absolute bg-transparent left-4 top-28 z-10">
                    <Navigation />
                </nav>
                <aside className="absolute bg-transparent right-4 top-28 z-10">
                    <Drawer />
                </aside>
                <main className="h-screen overflow-y-auto">
                    <Routes />
                </main>
            </section>
        </Router>
    )
}

export default App
