import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./CommonApp";
import reducers from "./store/reducers/index";
import reportWebVitals from "./reportWebVitals";
// import "./app.css";
import { Provider } from "react-redux";
const root = document.getElementById("root");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
if (root) {
    ReactDOM.createRoot(root).render(
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
