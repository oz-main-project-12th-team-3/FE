import { storeUser } from "../../store/storeUserEmail";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { FiCpu, FiMessageCircle, FiZap, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../../hooks/useThemeColors";
import { apiChat } from "../../api/chat/chatSession";
import { toast } from "react-toastify";
import { fitScreen } from "../../styles/mixins";

export default function Welcome() {
  const navi = useNavigate();

  const { userEmail } = storeUser();

  const {
    welcomeText,
    welcomeSubtitle,
    welcomeDescription,
    welcomeCardBg,
    welcomeCardBorder,
    welcomeCardIcon,
    welcomeCardTitle,
    welcomeCardDesc,
    welcomeButtonBg,
    welcomeButtonText,
    welcomeButtonHoverBg,
    welcomeFooterText,
    welcomeIconColor,
  } = useThemeColors();

  const features = [
    {
      icon: <FiCpu size={28} />,
      title: "지능형 AI 비서",
      desc: "최신 AI 기술을 활용한 똑똑한 디지털 휴먼",
    },
    {
      icon: <FiMessageCircle size={28} />,
      title: "자연스러운 대화",
      desc: "인간과 같은 자연스러운 소통 경험",
      highlight: true,
    },
    {
      icon: <FiZap size={28} />,
      title: "빠른 응답",
      desc: "실시간으로 빠르고 정확한 답변 제공",
    },
    {
      icon: <FiShield size={28} />,
      title: "안전한 서비스",
      desc: "개인정보 보호와 데이터 보안 완벽 지원",
    },
  ];

  const container = css`
    ${fitScreen}
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  `;

  const content = css`
    text-align: center;
    max-width: 800px;
  `;

  const iconWrapper = css`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 8px;
  `;

  const title = css`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: ${welcomeText};
  `;

  const subtitle = css`
    color: ${welcomeSubtitle};
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  `;

  const description = css`
    max-width: 520px;
    margin: 0 auto 2.5rem auto;
    line-height: 1.6;
    color: ${welcomeDescription};
    font-size: 0.9rem;
  `;

  const cardGrid = css`
    display: flex;
    gap: 16px;
    margin-bottom: 2rem;
  `;

  const card = css`
    border: 1px solid ${welcomeCardBorder};
    border-radius: 12px;
    padding: 1.2rem;
    background: ${welcomeCardBg};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    color: ${welcomeCardTitle};
  `;

  const cardIcon = css`
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    svg {
      color: ${welcomeCardIcon};
    }
  `;

  const cardTitle = css`
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: ${welcomeCardTitle};
  `;

  const cardDesc = css`
    font-size: 0.8rem;
    color: ${welcomeCardDesc};
    line-height: 1.4;
  `;

  const startButton = css`
    background: ${welcomeButtonBg};
    color: ${welcomeButtonText};
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    &:hover {
      background: ${welcomeButtonHoverBg};
    }
  `;

  const footerText = css`
    color: ${welcomeFooterText};
    font-size: 0.75rem;
    margin-top: 0.75rem;
  `;

  const newChat = { title: "new chat" };

  // 시작하기 버튼 누를시 즉시 새 채팅 화면으로 이동
  const handleStart = async () => {
    if (!userEmail) {
      navi("/auth");
      toast.info("채팅을 시작하려면 로그인 또는 회원가입이 필요합니다.");
      return;
    }

    try {
      const res = await apiChat.POST.chatSession(newChat);
      navi(`/chat/${res.id}`);
    } catch (e) {
      navi("/");
      toast.error(e instanceof Error ? e.message : "새 채팅 생성 실패");
    }
  };

  return (
    <div css={container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        css={content}
      >
        {/* 헤더 */}
        <div css={iconWrapper}>
          <FiCpu size={40} color={welcomeIconColor} />
          <h1 css={title}>Digital Human AI</h1>
        </div>
        <p css={subtitle}>AI 가상비서 서비스</p>

        {/* 설명 */}
        <p css={description}>
          혁신적인 AI 가상비서를 만나보세요.
          <br />
          자연스러운 대화와 똑똑한 서비스로 새로운 경험을 선사합니다.
        </p>

        {/* 특징 카드 */}
        <div css={cardGrid}>
          {features.map((f, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} css={card}>
              <div css={cardIcon}>{f.icon}</div>
              <h3 css={cardTitle}>{f.title}</h3>
              <p css={cardDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 버튼 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          css={startButton}
          onClick={handleStart}
        >
          시작하기 →
        </motion.button>

        <p css={footerText}>지금 바로 AI와 대화를 시작해보세요</p>
      </motion.div>
    </div>
  );
}
