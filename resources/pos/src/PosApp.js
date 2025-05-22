import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./App";
import reducers from "./store/reducers/index";
import reportWebVitals from "./reportWebVitals";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const PosApp = () => {
    return <App />;
};

export default PosApp;
