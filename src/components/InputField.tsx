/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useThemeColors } from '../hooks/useThemeColors';

type Props = {
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  leftIcon?: React.ReactNode;
  passwordToggle?: boolean;
};

export const InputField = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
  passwordToggle,
}: Props) => {
  const [show, setShow] = useState(false);
  const actualType = passwordToggle ? (show ? 'text' : 'password') : type;
  const { inputBg, tabBtnText } = useThemeColors();

  const wrapperStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${inputBg};
    padding: 12px;
    border-radius: 8px;
    width: 100%;
  `;

  const inputStyle = css`
    border: none;
    background: transparent;
    flex: 1;
    outline: none;
    width: 100%;
  `;

  const toggleButtonStyle = css`
    background: none;
    border: none;
    font-size: 12px;
    cursor: pointer;
    color: ${tabBtnText};
  `;

  const errorTextStyle = css`
    color: red;
    font-size: 12px;
    margin-top: 4px;
    padding-left: 4px;
  `;

  return (
    <div>
      <div css={wrapperStyle}>
        {leftIcon && <div>{leftIcon}</div>}
        <input
          id={name}
          css={inputStyle}
          type={actualType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {passwordToggle && (
          <button type="button" css={toggleButtonStyle} onClick={() => setShow(!show)}>
            {show ? <IoEyeOutline /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>
      {error && <p css={errorTextStyle}>{error}</p>}
    </div>
  );
};
