import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./App";
import rootReducer from "./redux/reducers/rootReducer";

const saveToLocalStorage = (state) =>
{
  try
  {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  }
  catch(err)
  {
    console.log(err);
  }
}

const loadFromLocalStorage = () =>
{
  try
  {
    const serializedState = localStorage.getItem("state");
    if(serializedState == null) return undefined;
    return JSON.parse(serializedState);
  }
  catch(err)
  {
    console.log(err);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, composeWithDevTools());
store.subscribe(() => saveToLocalStorage(store.getState()));

const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
