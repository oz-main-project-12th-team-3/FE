/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCard from './PricingCard';
import { usePlans } from '../../hooks/api/usePlans';
import type { Plan } from '../../api/plan/plan';
import { useThemeColors } from '../../hooks/useThemeColors';

const PremiumPage = () => {
  const navigate = useNavigate();
  const { getAllPlans, getPlanFeatures} = usePlans();
  const [plans, setPlans] = useState<Plan[]>([]);

  const { premiumTitle, premiumSubtitle } = useThemeColors();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await getAllPlans();
      setPlans(data.filter((plan) => plan.is_active));
    } catch (error) {
      console.error('요금제 로드 실패:', error);
    } finally {
    }
  };

 const containerStyle = css`
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    z-index: 1;
  `;

  const headerStyle = css`
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
    if (price === 0) return '무료';
    return `${price.toLocaleString()}원`;
  };

  const handleGetStarted = (plan: Plan) => {
    if (plan.price === 0) {
      alert('You are already on the Free plan!');
    } else {
      alert(`Redirecting to payment for ${plan.name}...`);
      // TODO: 결제 페이지로 이동
      // navigate(`/payment/${plan.id}`);
    }
  };

  return (
      <div css={containerStyle}>
        <div css={headerStyle}>
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
};

export default PremiumPage;