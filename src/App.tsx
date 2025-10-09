/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WindowSizeSetter from "./components/utilComponents/WindowSizeProvider";
import { MousePositonSetter } from "./components/utilComponents/MousePositionSetter";
import { ToastContainer } from "react-toastify";

// Home은 즉시 로드
import Home from "./components/Home";
import WelcomePage from "./components/welcome/WelcomePage"
import PremiumPage from "./components/premium/PremiumPage";
import { ThemeModeBtn } from "./components/sidebar/Leftbar/ThemeModeBtn";
import { NotiTypesSetter } from "./components/utilComponents/GetNotiTypes";
import { RiveBackGround } from "./components/background/RiveBackground";
import { fitScreen } from "./styles/mixins";

const lazyModal = (path: string) =>
  React.lazy(() => import(`./components/modal/${path}`));

const Modal = lazyModal("Modal");
const AuthModal = lazyModal("authmodal/AuthModal");
const ScheduleModal = lazyModal("schedule_modal/scheduleModal");
const NotificationModal = lazyModal("notification_modal/NotificationModal");
const TermsModal = lazyModal("authmodal/TermsModal");
const PasswordChangeModal = lazyModal("passwordChang/PasswordChangeModal");
const DeleteAccountModal = lazyModal("deleteAccount_modal/DeleteAccountModal");
const ProfileSettingModal = lazyModal(
  "profileSetting_modal/ProfileSettingModal"
);

export default function AppDesktop() {
  return (
    <>
      {/* ui없는 기능성 컴포넌트 */}
      <WindowSizeSetter />
      <MousePositonSetter />
      <NotiTypesSetter />

      {/* 배경 */}
      <RiveBackGround />

      <div css={fitScreen}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat/:session_id" element={<Home />} />
          <Route path="/chat/new" element={<Home />} />
          <Route path="/premium" element={<PremiumPage />} />

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
      </div>
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
