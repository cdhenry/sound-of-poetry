import React, { lazy, LazyExoticComponent, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { RoutesEnum } from './enums/routes'
import Loading from './pages/Loading'

interface RouteConfig {
    exact: boolean
    path: string
    component: (() => JSX.Element) | LazyExoticComponent<any>
}

const Home = lazy(() => import('./pages/Home'))
const Map = lazy(() => import('./pages/Map'))
const Library = lazy(() => import('./pages/Library'))
const Studio = lazy(() => import('./pages/Studio'))
const Theater = lazy(() => import('./pages/Theater'))

const routesConfig: RouteConfig[] = [
    {
        exact: true,
        path: '/',
        component: Home
    },
    {
        exact: true,
        path: RoutesEnum.Map,
        component: Map
    },
    {
        exact: true,
        path: RoutesEnum.Library,
        component: Library
    },
    {
        exact: true,
        path: RoutesEnum.Studio,
        component: Studio
    },
    {
        exact: true,
        path: RoutesEnum.Theater,
        component: Theater
    }
]

const renderRoutes = (routes: RouteConfig[]): JSX.Element => (
    <Suspense fallback={Loading}>
        <Switch>
            {routes.map((route: any, i: number) => {
                const Component = route.component

                return (
                    <Route
                        key={`Route${i}`}
                        path={route.path}
                        exact={route.exact}
                        render={(props: any) => <Component {...props} />}
                    />
                )
            })}
        </Switch>
    </Suspense>
)

export default function Routes(): JSX.Element {
    return renderRoutes(routesConfig)
}
