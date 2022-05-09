import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../Utils/utils";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

export const PublicRoute = ({
  component: Component,
  isRedirect,
  restricted,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        (isLogin() && restricted) || isRedirect ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
