import { Route, Redirect } from "react-router-dom";
import React from "react";
import { authenticator } from "./authenticator";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        authenticator.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
