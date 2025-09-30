import React, { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { Route, Routes } from "react-router-dom";
import WindowSizeProvider from "./components/utilComponents/WindowSizeProvider";
import { MousePositonSetter } from "./components/utilComponents/MousePositionSetter";
import { ToastContainer } from "react-toastify";


// Home은 즉시 로드
import Home from "./components/Home";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const AuthModal = React.lazy(() => import("./components/modal/authmodal/AuthModal"));
const ScheduleModal = React.lazy(() => import("./components/modal/schedule_modal/scheduleModal"));
const TermsModal = React.lazy(() => import("./components/modal/authmodal/TermsModal"));

export default function AppDesktop() {
  useEffect(() => {
    // testLogin();
  });

  return (
    <>
        <Background>
          <WindowSizeProvider />
          <MousePositonSetter />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:session_id" element={<Home />} />
            <Route path="/chat/new" element={<Home />} />

              <Route path="modal" element={<Modal />}>
                <Route path="auth" element={<AuthModal />} />
                <Route path="terms" element={<TermsModal />} />
                <Route path="schedule" element={<ScheduleModal />} />
              </Route>
            </Routes>
        </Background>

        <ToastContainer
              position="top-center"  // 위치
              autoClose={3000}       // 3초 후 닫힘
              hideProgressBar        // 프로그레스바 표시 여부
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              style={{ zIndex: 9999 }} // 모달보다 높게 지정
            />
    
    </>
  );
}
