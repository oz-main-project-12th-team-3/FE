import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root.tsx";
import { RuntimeLoader } from "@rive-app/react-canvas";

RuntimeLoader.setWasmUrl('/rive_fallback.wasm');

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
