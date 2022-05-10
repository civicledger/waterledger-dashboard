import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import rootReducer from "./redux/reducers/reducers";

import "./styles/main.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
