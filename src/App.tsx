import React, { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { useMousePositionStore } from "./store/useMousePositionStore";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { testLogin } from "./api/test";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const AuthModal = React.lazy(() => import("./components/modal/authmodal/AuthModal"));

export default function App() {

  // 마우스 포지션 스토어에 저장
  const { setPosition } = useMousePositionStore();
  const updateMousePosition = (e: MouseEvent) => {
    setPosition(e.clientX, e.clientY);
  };
  useEffect(() => {
    testLogin()
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <Background>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="modal" element={<Modal />}>
            <Route path="login" element={<AuthModal />} />
          </Route>
        </Routes>
    </Background>
  );
}

