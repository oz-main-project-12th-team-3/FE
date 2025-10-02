/** @jsxImportSource @emotion/react */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";
import { flexCenter, overlay } from "../../styles/mixins";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "../../styles/modal/modalVariants";
import { IoArrowBack } from "react-icons/io5";
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { storeSignupForm } from "../../store/storeSignupForm";

export default function Modal() {
  const navigate = useNavigate();
  const location = useLocation();
  // modal로 이동시 이전 경로 저장을 위해 반드시 state: { prevPath: location.pathname } 를 포함 할 것
  // @example
  // navi("/modal/auth", {
  // state: { prevPath: location.pathname }
  // });
  const prevPath = location.state?.prevPath || "/";
  const { resetSignupForm } = storeSignupForm();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    openModal();
    return () => closeModal();
  }, [openModal, closeModal]);

  // TODO : 모달창 띄우고 뒤로가기 누를시 이전 화면이 제대로 표시되지 않는 문제가 있음
  const handleClose = () => {
    closeModal();
    window.history.length > 1
      ? navigate(prevPath, { replace: true })
      : navigate("/", { replace: true });
    console.log(prevPath);

    resetSignupForm();
  };

  const { text } = useThemeColors();
  const backBtnColor = css`
    color: ${text};
  `;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          css={[overlay, flexCenter()]}
          onClick={handleClose}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key="modal"
            css={positionCss}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Outlet />
            <IoArrowBack
              className="IoArrowBack"
              css={[closeButtonStyle, backBtnColor]}
              onClick={handleClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

const positionCss = css`
  position: relative;
`;

const closeButtonStyle = css`
  position: absolute;
  left: -2.5rem;
  top: 1rem;
  cursor: pointer;
  font-size: 1.7rem;
`;
