import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App.jsx";
import { BrowserRouter } from "react-router-dom";
import "../src/style/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
