import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import Login from "./components/Login";
import AuthenticatedComponent from "./components/AuthenticatedComponent";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <AuthenticatedComponent>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </AuthenticatedComponent>
      </Switch>
    </div>
  </Router>
);
