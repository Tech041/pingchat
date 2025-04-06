import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AppContextProvider>
  </Router>
);
