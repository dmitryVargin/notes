import React from "react";
import {Route} from "react-router-dom";
import Auth from "./components/Auth";
import App from "./components/App";

const AppStart = () => {
  const isAuth = true
  return (
    <div className="AppStart">
      {!isAuth ? <Auth/> : ""}
      <Route path="/app" render={() => <App/>}/>
    </div>
  );
}

export default AppStart;
