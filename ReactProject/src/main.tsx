import { createRoot } from "react-dom/client";
import App from "./App";

// Get the root container element
const container = document.getElementById("root");

// Ensure the container exists before rendering
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Root container not found");
}
