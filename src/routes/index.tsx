import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../page/Signin";
import SignUp from "../page/SignUp";

import Dashboard from "../page/Dashboard";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
