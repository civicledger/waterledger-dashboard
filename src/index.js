import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import rootReducer from "./redux/reducers/reducers";

import "./styles/main.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
