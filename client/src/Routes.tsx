import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { RoutesEnum } from './enums/routes'
import Loading from './pages/Loading'

const Poems = lazy(() => import('./pages/Poems'))
const Poem = lazy(() => import('./pages/Poems/Poem'))
const Poets = lazy(() => import('./pages/Poets'))
const Poet = lazy(() => import('./pages/Poets/Poet'))
const Words = lazy(() => import('./pages/Words'))
const Word = lazy(() => import('./pages/Words/Word'))
const Map = lazy(() => import('./pages/Map'))

export default function Routes(): JSX.Element {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route exact path="/">
                    <Redirect to={RoutesEnum.Poems} />
                </Route>
                <Route exact path={RoutesEnum.Poems}>
                    <Poems />
                </Route>
                <Route path={`${RoutesEnum.Poems}/:id`}>
                    <Poem />
                </Route>
                <Route exact path={RoutesEnum.Poets}>
                    <Poets />
                </Route>
                <Route path={`${RoutesEnum.Poets}/:id`}>
                    <Poet />
                </Route>
                <Route exact path={RoutesEnum.Words}>
                    <Words />
                </Route>
                <Route path={`${RoutesEnum.Words}/:id`}>
                    <Word />
                </Route>
                <Route exact path={RoutesEnum.Map}>
                    <Map />
                </Route>
            </Switch>
        </Suspense>
    )
}
