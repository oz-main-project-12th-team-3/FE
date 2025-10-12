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
import { SearchModal } from "./components/modal/search/SearchModal";

const Modal = React.lazy(() => import("./components/modal/Modal.tsx"));
const AuthModal = React.lazy(() => import("./components/modal/authmodal/AuthModal.tsx"));
const ScheduleModal = React.lazy(() => import("./components/modal/schedule_modal/scheduleModal.tsx"));
const NotificationModal = React.lazy(() => import("./components/modal/notification_modal/NotificationModal.tsx"));
const TermsModal = React.lazy(() => import("./components/modal/authmodal/TermsModal.tsx"));
const PasswordChangeModal = React.lazy(() => import("./components/modal/passwordChang/PasswordChangeModal.tsx"));
const DeleteAccountModal = React.lazy(() => import("./components/modal/deleteAccount_modal/DeleteAccountModal.tsx"));
const ProfileSettingModal = React.lazy(() => import("./components/modal/profileSetting_modal/ProfileSettingModal.tsx"));
const SetTwoFAModal = React.lazy(() => import("./components/modal/set_twoFA_modal/SetTwoFAModal.tsx"));

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
            <Route path="search/:search_params" element={<SearchModal />} />

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
