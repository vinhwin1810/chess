import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Transition from "./Transition";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Transition>
      <App />
    </Transition>
  </React.StrictMode>
);
