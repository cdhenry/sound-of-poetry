import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { RoutesEnum } from './enums/routes';
import Loading from './pages/Loading';

const Home = lazy(() => import('./pages/Home'))
const Map = lazy(() => import('./pages/Map'))
const Library = lazy(() => import('./pages/Library'))
const Studio = lazy(() => import('./pages/Studio'))
const Theater = lazy(() => import('./pages/Theater'))

export default function Routes(): JSX.Element {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route path="/" exact={true}>
                    <Home />
                </Route>
                <Route path={RoutesEnum.Map} exact={true}>
                    <Map />
                </Route>
                <Route path={RoutesEnum.Library} exact={true}>
                    <Library />
                </Route>
                <Route path={RoutesEnum.Studio} exact={true}>
                    <Studio />
                </Route>
                <Route path={RoutesEnum.Theater} exact={true}>
                    <Theater />
                </Route>
            </Switch>
        </Suspense>
    )
}
