import React, { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { useMousePositionStore } from "./store/useMousePositionStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const Login = React.lazy(() => import("./components/modal/Login"));

export default function App() {

  // 마우스 포지션 스토어에 저장
  const { setPosition } = useMousePositionStore();
  const updateMousePosition = (e: MouseEvent) => {
    setPosition(e.clientX, e.clientY);
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <Background>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="modal" element={<Modal />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Background>
  );
}

