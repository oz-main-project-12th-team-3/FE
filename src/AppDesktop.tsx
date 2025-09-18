import React, { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { useMousePositionStore } from "./store/useMousePositionStore";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { testLogin } from "./api/test";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const Login = React.lazy(() => import("./components/modal/Login"));

export default function AppDesktop() {
  // 마우스 포지션 스토어에 저장
  const updateMousePosition = (e: MouseEvent) => {
    useMousePositionStore.getState().setMousePosition(e.clientX, e.clientY);
  };
  useEffect(() => {
    testLogin();
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("dragover", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("dragover", updateMousePosition);
    };
  }, []);

  return (
    <Background>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="modal" element={<Modal />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Background>
  );
}
