import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LoadProvider } from "./Contexts/LoaderContext.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadProvider>
      <App />
    </LoadProvider>
  </React.StrictMode>
);
