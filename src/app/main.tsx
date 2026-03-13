import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import App from "./App";
import { UserProvider } from "@/contexts/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter basename="/bookingpro">
          <App />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);
