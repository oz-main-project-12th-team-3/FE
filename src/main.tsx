import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useDeviceType } from "./hooks/useDeviceType.tsx";
import React from "react";

const AppMobile = React.lazy(() => import("./AppMobile.tsx"));
const AppDesktop = React.lazy(() => import("./AppDesktop.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

function Root() {
  const device = useDeviceType();
  if (device === "mobile") return <AppMobile />;
  return <AppDesktop />;
}
