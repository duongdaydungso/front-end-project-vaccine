import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import reduxStore, { persistor } from "./redux";

import App from "./containers/App";
import "./default_styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
    <App persistor={persistor} />
  </Provider>
);
