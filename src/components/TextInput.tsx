/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

type Props = {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  passwordToggle?: boolean;
};

export const TextInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  leftIcon,
  passwordToggle,
}: Props) => {
  const [show, setShow] = useState(false);
  const actualType = passwordToggle ? (show ? 'text' : 'password') : type;

  return (
    <div css={wrapperStyle}>
      {leftIcon && <div css={iconLeftStyle}>{leftIcon}</div>}
      <input
        css={inputStyle}
        type={actualType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {passwordToggle && (
        <button type="button" css={toggleButtonStyle} onClick={() => setShow(!show)}>
          {show ? <IoEyeOutline /> : <FaRegEyeSlash/>}
        </button>
      )}
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
  width: 100%;
`;

const inputStyle = css`
  width: 100%;
  padding: 12px 40px 12px 36px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const iconLeftStyle = css`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #777;
`;

const toggleButtonStyle = css`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: #555;
`;
