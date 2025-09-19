import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useDeviceTypeHook } from "./hooks/useDeviceType.tsx";
import React from "react";
import { useDeviceTypeStore } from "./store/useDeviceTypeStore.ts";

const AppMobile = React.lazy(() => import("./AppMobile.tsx"));
const AppDesktop = React.lazy(() => import("./AppDesktop.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

function Root() {
  useDeviceTypeHook();
  const device = useDeviceTypeStore.getState().platform;
  if (device === "mobile") return <AppMobile />;
  return <AppDesktop />;
}
