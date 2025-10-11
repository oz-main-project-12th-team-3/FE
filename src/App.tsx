/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WindowSizeSetter from "./components/utilComponents/WindowSizeProvider";
import { ToastContainer } from "react-toastify";
import { fitScreen } from "./styles/mixins";
import { MousePositonSetter } from "./components/utilComponents/MousePositionSetter";
import { NotiTypesSetter } from "./components/utilComponents/GetNotiTypes";

// Home은 즉시 로드
import Home from "./components/Home";
import { ThemeModeBtn } from "./components/sidebar/Leftbar/ThemeModeBtn";
import { RiveBackGround } from "./components/background/RiveBackground";
import { RiveRobot } from "./components/RiveRobot";

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
const SetTwoFAModal = lazyModal("set_twoFA_modal/SetTwoFAModal");

export default function AppDesktop() {
  return (
    <>
      {/* ui없는 기능성 컴포넌트 */}
      <WindowSizeSetter />
      <MousePositonSetter />
      <NotiTypesSetter />

      {/* 배경 */}
      <RiveBackGround />
      <RiveRobot />

      <div css={fitScreen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:session_id" element={<Home />} />
          <Route path="/premium" element={<Home />} />

          <Route path="modal" element={<Modal />}>
            <Route path="auth" element={<AuthModal />} />
            <Route path="terms" element={<TermsModal />} />
            <Route path="schedule" element={<ScheduleModal />} />
            <Route path="notification" element={<NotificationModal />} />
            <Route path="password" element={<PasswordChangeModal />} />
            <Route path="deleteaccount" element={<DeleteAccountModal />} />
            <Route path="profilesetting" element={<ProfileSettingModal />} />
            <Route path="setTwoFA" element={<SetTwoFAModal />} />
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
