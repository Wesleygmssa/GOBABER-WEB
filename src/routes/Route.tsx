import React from "react";
import { useAuth } from "../hooks/Auth";
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRouter,
  Redirect,
} from "react-router-dom";

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDOMRouter
      {...rest}
      render={(location) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              //   state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
