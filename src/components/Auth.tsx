import React, { Component } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotForm from "./ForgotForm";
import { Route, Redirect, Switch } from "react-router-dom";

class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <Switch>
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/signup" render={() => <SignUpForm />} />
          <Route path="/forgot" render={() => <ForgotForm />} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    );
  }
}

export default Auth;
