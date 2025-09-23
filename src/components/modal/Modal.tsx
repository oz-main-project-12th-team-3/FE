/** @jsxImportSource @emotion/react */
import { Outlet, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";
import { flexCenter, overlay } from "../../styles/mixins";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "../../styles/modal/modalVariants";
import { IoArrowBack } from "react-icons/io5";
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";

export default function Modal() {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  useEffect(() => {
    openModal();
    return () => closeModal();
  }, [openModal, closeModal]);

  const handleClose = () => {
    closeModal();
    window.history.length > 1 ? navigate(-1) : navigate("/", { replace: true });
  };
  const { text } = useThemeColors();
  const backBtnColor = css`
    border-color: ${text};
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
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <IoArrowBack css={[closeButtonStyle, backBtnColor]} onClick={handleClose} />
            <Outlet />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

const closeButtonStyle = css`
  position: absolute;
  left: -2rem;
  top: 1rem;
`;
