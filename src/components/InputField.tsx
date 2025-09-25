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
};

export const InputField = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
}: Props) => {
  const [show, setShow] = useState(false);
  const actualType = type === 'password' ? (show ? 'text' : 'password') : type;
 const { inputBorder, tabBtnText, deleteBtnBg } = useThemeColors()

  const wrapperStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid ${inputBorder};
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
    color: ${deleteBtnBg};
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
        {type === 'password' && (
          <button
            type="button"
            css={toggleButtonStyle}
            onClick={() => setShow(!show)}
          >
            {show ? <IoEyeOutline /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>
      {error && <p css={errorTextStyle}>{error}</p>}
    </div>
  );
};
