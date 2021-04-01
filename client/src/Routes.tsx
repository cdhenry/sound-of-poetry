import React, { Fragment, lazy, LazyExoticComponent, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { RoutesEnum } from './enums/routes';
import Loading from './pages/Loading';

interface RouteConfig {
    exact: boolean
    path: string
    component: (() => JSX.Element) | LazyExoticComponent<any>
}

const Dashboard = lazy(() => import('./pages/Dashboard'))

const routesConfig: RouteConfig[] = [
    {
        exact: true,
        path: '/',
        component: () => <Redirect to={RoutesEnum.dashboard} />
    },
    {
        exact: true,
        path: RoutesEnum.dashboard,
        component: Dashboard
    }
]

const renderRoutes = (routes: RouteConfig[]): JSX.Element => (
    <Suspense fallback={Loading}>
        <Switch>
            {routes.map((route: any, i: number) => {
                const Layout = route.layout || Fragment
                const Component = route.component

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props: any) => (
                            <Layout>
                                <Component {...props} />
                            </Layout>
                        )}
                    />
                )
            })}
        </Switch>
    </Suspense>
)

function Routes(): JSX.Element {
    return renderRoutes(routesConfig)
}

export default Routes
