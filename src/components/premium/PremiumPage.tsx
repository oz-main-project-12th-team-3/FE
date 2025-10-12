/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import PricingCard from "./PricingCard";
import { usePlans } from "../../hooks/api/usePlans";
import type { Plan } from "../../api/plan/plan";
import { useThemeColors } from "../../hooks/useThemeColors";
import { toast } from "react-toastify";
import { fitScreen } from "../../styles/mixins";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function PremiumPage() {
  const navi = useNavigate();
  const { getAllPlans, getPlanFeatures } = usePlans();
  const [plans, setPlans] = useState<Plan[]>([]);

  const { premiumTitle, premiumSubtitle, text } = useThemeColors();

  const loadPlans = useCallback(async () => {
    try {
      const data = await getAllPlans();
      setPlans(data.filter((plan) => plan.is_active));
    } catch (error) {
      console.error("요금제 로드 실패:", error);
    } finally {
      // 의도적으로 비워둠 또는 후처리 로직
    }
  }, [getAllPlans]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const containerStyle = css`
    ${fitScreen}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    z-index: 1;
  `;

  const headerStyle = css`
    position: relative;
    text-align: center;
    margin-bottom: 60px;
    max-width: 800px;
  `;

  const titleStyle = css`
    font-size: 64px;
    font-weight: 800;
    color: ${premiumTitle};
    margin-bottom: 16px;
    letter-spacing: -2px;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 48px;
    }
  `;

  const subtitleStyle = css`
    font-size: 20px;
    color: ${premiumSubtitle};
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  `;

  const cardsContainerStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
    max-width: 1200px;
    width: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  `;

  const formatPrice = (price: number): string => {
    if (price === 0) return "무료";
    return `${price.toLocaleString()}원`;
  };

  const handleGetStarted = (plan: Plan) => {
    if (plan.price === 0) {
      toast.info("You are already on the Free plan!");
    } else {
      toast.info(`Redirecting to payment for ${plan.name}...`);
      // TODO: 결제 페이지로 이동
      // navi(`/payment/${plan.id}`);
    }
  };

  const backBtnColor = css`
    color: ${text};
  `;

  const handleClose = () => {
    navi("/");
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <IoArrowBack
          className="IoArrowBack"
          css={[closeButtonStyle, backBtnColor]}
          onClick={handleClose}
        />
        <h1 css={titleStyle}>요금제</h1>
        <p css={subtitleStyle}>
          나에게 맞는 요금제를 선택하세요. 언제든 업그레이드할 수 있습니다.
        </p>
      </div>

      <div css={cardsContainerStyle}>
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            planName={plan.name}
            price={formatPrice(plan.price)}
            features={getPlanFeatures(plan)}
            onGetStarted={() => handleGetStarted(plan)}
          />
        ))}
      </div>
    </div>
  );
}

const closeButtonStyle = css`
  position: absolute;
  left: -10rem;
  top:1rem;
  cursor: pointer;
  font-size: 2.5rem;
`;
