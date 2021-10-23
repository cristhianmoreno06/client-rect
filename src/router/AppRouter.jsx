import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Login } from '../components/Auth/Login';
import { ContentRouter } from '../router/ContentRouter';
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRouter";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' component={Login} />
                    <PrivateRoute path='/home' component={ContentRouter} />
                    <PublicRoute exact path='/' component={Login} />

                    <PublicRoute to='/' />
                </Switch>
            </div>
        </Router>
    )
}

