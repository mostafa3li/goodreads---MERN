import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const goodreadsApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(goodreadsApp, document.getElementById("root"));
