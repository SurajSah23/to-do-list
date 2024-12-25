import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js"; // Import the store

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the App component with Redux Provider to pass down store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
