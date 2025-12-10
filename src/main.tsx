import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import RedirectHandler from "./components/RedirectHandler.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/spend-together-web">
      <RedirectHandler />
      <App />
    </BrowserRouter>
  </StrictMode>
);
