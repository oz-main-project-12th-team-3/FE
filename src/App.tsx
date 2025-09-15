// src/App.tsx
import React, { useEffect, Suspense } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { useMousePositionStore } from "./store/useMousePositionStore";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ BrowserRouter 추가
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const Login = React.lazy(() => import("./components/modal/Login"));

export default function App() {
  // 마우스 포지션 스토어에 저장
  const { setPosition } = useMousePositionStore();
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [setPosition]);

  return (
    <BrowserRouter> {/* ✅ 라우팅은 App에서 관리 */}
      <Suspense fallback={<div>로딩 중...</div>}> {/* ✅ 팀장님 포맷 */}
        <Background>
          <Routes>
            {/* 기본 진입은 웰컴 페이지 */}
            <Route path="/" element={<WelcomePage />} />
            {/* 웰컴의 “시작하기” 버튼이 보내는 곳 */}
            <Route path="/chat" element={<Home />} />
            {/* 모달 라우트(그대로 유지) */}
            <Route path="modal" element={<Modal />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Background>
      </Suspense>
    </BrowserRouter>
  );
}
