import React from "react";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <h2>Welcome to Goodreads App</h2>
    </Provider>
  );
}

export default App;
