import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import AppStart from "./AppStart";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import App from "./components/App";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppStart/>
      </BrowserRouter>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
