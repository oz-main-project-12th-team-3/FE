import React from "react";
import "./App.css";
import Background from "./components/background/Background";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const Modal = React.lazy(() => import("./components/modal/Modal"));
const Login = React.lazy(() => import("./components/modal/Login"));

// 단순 분기 처리만 한 상태
// 반드시 앱 데스크탑 파일을 참조하여 작성할것!!

export default function AppMobile() {
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
