import React from "react";
import ReactDOM from "react-dom/client"; // ✅ FIXED
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./features/Store"; // also fix case if needed
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);