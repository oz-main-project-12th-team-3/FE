import { useDeviceTypeHook } from "./hooks/useDeviceType.tsx";
import { useDeviceTypeStore } from "./store/useDeviceTypeStore.ts";
import React from "react";

const AppMobile = React.lazy(() => import("./AppMobile.tsx"));
const AppDesktop = React.lazy(() => import("./App.tsx"));

export default function Root() {
  useDeviceTypeHook();
  const device = useDeviceTypeStore.getState().platform;
  if (device === "mobile") return <AppMobile />;
  return <AppDesktop />;
}