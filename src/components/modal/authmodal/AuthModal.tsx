/** @jsxImportSource @emotion/react */
import { useEffect,  useRef, useState } from "react";
import { css } from "@emotion/react";
import AuthTabs, { type tab } from "./AuthTabs";
import LoginForm from "./LoginForm";
import Signupform from "./SignupForm";
import SocialLogin from "./SocialLogin";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import { IoShieldOutline } from "react-icons/io5";
import { useThemeColors } from "../../../hooks/useThemeColors";


export default function AuthModalContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") as tab | null;
  const [tab, setTab] = useState<tab>(currentTab ?? "login");

  const { modalBackground, descriptionText } = useThemeColors();
  

  const [height, setHeight] = useState<number | "auto">("auto");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (currentTab && currentTab !== tab) {
    setTab(currentTab);
  }
}, [currentTab, tab]);

const handleChangeTab = (value:tab) => {
  setTab(value);
  setSearchParams({ tab: value });
};

useEffect(() => {
  if (!containerRef.current) return;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      setHeight(entry.contentRect.height + 370);
    }
  });

  observer.observe(containerRef.current);

  return () => observer.disconnect();;
}, []);


  const container = css`
    width: 400px;
    background: ${modalBackground};
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  const title = css`
    display: flex;
    align-items: center;
    gap: 5px;
  `;
  const header = css`
    display: flex;
    justify-content: space-between;

    text-align: center;
    h2 {
      margin: 8px 0 4px;
      font-size: 20px;
      font-weight: 700;
    }
  `;

  const description = css`
    font-size: 12px;
    color: ${descriptionText};
  `;

  return (
    <motion.div
      css={container}
      animate={{ height }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{ overflow: "hidden" }}
    >
      {/* 상단 로고/타이틀 */}
      <div>
        <div css={header}>
          <div css={title}>
            <IoShieldOutline size={20} />
            <h2>비서 AI</h2>
          </div>
        </div>
        <p css={description}>AI 가상비서 서비스에 오신 것을 환영합니다</p>
      </div>

      {/* 로그인/회원가입 탭 */}
      <AuthTabs tab={tab} setTab={handleChangeTab} />

      {/* 탭에 따른 폼 */}
      <div ref={containerRef}>
        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Signupform />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 간편 로그인 */}
      <SocialLogin />
    </motion.div>
  );
}
