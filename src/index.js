import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import AppContainer from "./components/AppContainer";

import rootReducer from "./redux/reducers/reducers";

import * as serviceWorker from "./serviceWorker";

import "./styles/main.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
