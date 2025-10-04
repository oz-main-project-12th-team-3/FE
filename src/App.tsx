import React, { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { Route, Routes } from "react-router-dom";
import WindowSizeSetter from "./components/utilComponents/WindowSizeProvider";
import { MousePositonSetter } from "./components/utilComponents/MousePositionSetter";
import { ToastContainer } from "react-toastify";

// Home은 즉시 로드
import Home from "./components/Home";
import { ThemeModeBtn } from "./components/sidebar/Leftbar/ThemeModeBtn";
import { NotiTypesSetter } from "./components/utilComponents/GetNotiTypes";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const AuthModal = React.lazy(
  () => import("./components/modal/authmodal/AuthModal")
);
const ScheduleModal = React.lazy(
  () => import("./components/modal/schedule_modal/scheduleModal")
);
const NotificationModal = React.lazy(
  () => import("./components/modal/notification_modal/NotificationModal")
);
const TermsModal = React.lazy(
  () => import("./components/modal/authmodal/TermsModal")
);
const PasswordChangeModal = React.lazy(
  () => import("./components/modal/passwordChang/PasswordChangeModal")
);
const DeleteAccountModal = React.lazy(
  () => import("./components/modal/deleteAccount_modal/DeleteAccountModal")
);
const ProfileSettingModal = React.lazy(
  () => import("./components/modal/profileSetting_modal/ProfileSettingModal")
);

export default function AppDesktop() {
  useEffect(() => {
    // testLogin();
  });

  return (
    <>
    {/* ui없는 기능성 컴포넌트 */}
      <WindowSizeSetter />
      <MousePositonSetter />
      <NotiTypesSetter/>

      <Background>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:session_id" element={<Home />} />
          <Route path="/chat/new" element={<Home />} />

          <Route path="modal" element={<Modal />}>
            <Route path="auth" element={<AuthModal />} />
            <Route path="terms" element={<TermsModal />} />
            <Route path="schedule" element={<ScheduleModal />} />
            <Route path="notification" element={<NotificationModal />} />
            <Route path="password" element={<PasswordChangeModal />} />
            <Route path="deleteaccount" element={<DeleteAccountModal />} />
            <Route path="profilesetting" element={<ProfileSettingModal />} />
          </Route>
        </Routes>
      </Background>
      {/* 배경 바뀔때 리랜더링 방지용으로 버튼을 따로 빼놓음 */}
      <ThemeModeBtn />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}
