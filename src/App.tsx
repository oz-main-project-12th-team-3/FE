import React, { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { Route, Routes } from "react-router-dom";
import WindowSizeProvider from "./components/utilComponents/WindowSizeProvider";
import { MousePositonSetter } from "./components/utilComponents/MousePositionSetter";

// Home은 즉시 로드
import Home from "./components/Home";
const Modal = React.lazy(() => import("./components/modal/Modal"));
const Login = React.lazy(() => import("./components/modal/Login"));

export default function AppDesktop() {
  useEffect(() => {
    // testLogin();
  });

  return (
    <Background>
      <WindowSizeProvider />
      <MousePositonSetter />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<Home />} />
        <Route path="/chat/new" element={<Home />} />

        <Route path="modal" element={<Modal />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Background>
  );
}
