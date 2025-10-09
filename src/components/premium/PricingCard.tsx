/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdCheck } from 'react-icons/md';
import { useThemeColors } from '../../hooks/useThemeColors';

interface PricingCardProps {
  planName: string;
  price: string;
  features: string[];
  onGetStarted: () => void;
}

const PricingCard = ({ 
  planName, 
  price, 
  features, 
  onGetStarted 
}: PricingCardProps) => {
  const {
    premiumCardBg,
    premiumCardBorder,
    premiumCardHoverBorder,
    premiumCheckIcon,
    premiumTitle,
    premiumSubtitle,
    premiumFeatureText,
    premiumButtonBg,
    premiumButtonText,
    premiumButtonHoverBg
  } = useThemeColors();

  const cardStyle = css`
    background: ${premiumCardBg};
    backdrop-filter: blur(20px);
    border: 1px solid ${premiumCardBorder};
    border-radius: 24px;
    padding: 32px;
    width: 100%;
    max-width: 360px;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      border-color: ${premiumCardHoverBorder};
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }
  `;

  const headerStyle = css`
    margin-bottom: 24px;
  `;

  const planNameStyle = css`
    font-size: 14px;
    color: ${premiumSubtitle};
    margin-bottom: 8px;
    font-weight: 500;
  `;

  const priceStyle = css`
    font-size: 48px;
    font-weight: 700;
    color: ${premiumTitle};
    margin-bottom: 8px;
    font-family: 'Inter', sans-serif;
  `;

  const featuresStyle = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
    min-height: 280px;
  `;

  const featureItemStyle = css`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: ${premiumFeatureText};
    font-size: 14px;
    line-height: 1.6;
  `;

  const checkIconStyle = css`
    color: ${premiumCheckIcon};
    flex-shrink: 0;
    margin-top: 2px;
  `;

  const buttonStyle = css`
    width: 100%;
    padding: 16px;
    background: ${premiumButtonBg};
    color: ${premiumButtonText};
    border: 1px solid ${premiumCardBorder};
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${premiumButtonHoverBg};
      transform: scale(1.02);
    }
  `;

  return (
    <div css={cardStyle}>
      <div css={headerStyle}>
        <div css={planNameStyle}>{planName}</div>
        <div css={priceStyle}>{price}</div>
      </div>

      <div css={featuresStyle}>
        {features.map((feature, index) => (
          <div key={index} css={featureItemStyle}>
            <MdCheck size={20} css={checkIconStyle} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button css={buttonStyle} onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;