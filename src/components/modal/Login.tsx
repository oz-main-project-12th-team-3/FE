/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
// 리액트 아이콘
import { IoIosClose } from "react-icons/io";
import { FiMail, FiLock } from 'react-icons/fi';
import { TextInput } from '../TextInput';
import { FaGithub } from 'react-icons/fa';
import { IoShieldOutline } from "react-icons/io5";
// 소셜로그인 버튼 이미지
import googleLogo from '../../assets/google.png';
import naverLogo from '../../assets/naver.png';
import kakaoLogo from '../../assets/kakao.png';

const Login = () => {
const [tab, setTab] = useState<'login' | 'signup'>('login');
const [email, setEmail] = useState('');
const [pw, setPw] = useState('');

return (
    <div css={modalWrapperStyle}>
        <div css={groupStyle}>
            <IoShieldOutline size={20}/>
            <h2 css={titleStyle}>디지털 휴먼 AI</h2>
            <IoIosClose size={20} css={css`cursor: pointer;`}/>
        </div>

        <p css={subTitleStyle}>AI 가상비서 서비스에 오신 것을 환영합니다</p>

        <div css={tabGroupStyle}>
            <button css={[tabStyle, tab === 'login' && activeTabStyle]} onClick={() => setTab('login')}>로그인</button>
            <button css={[tabStyle, tab === 'signup' && activeTabStyle]} onClick={() => setTab('signup')}>회원가입</button>
        </div>

        <div css={formGroupStyle}>
            <label css={labelStyle}>이메일</label>
            <TextInput
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                leftIcon={<FiMail />}
            />

            <div css={groupStyle}>
                <label css={labelStyle}>비밀번호</label>
                <p css={[labelStyle, css` 
                    cursor: pointer;
                    font-size:11px;
                `]}>비밀번호 찾기</p>
            </div>
            <TextInput
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={pw}
                onChange={e => setPw(e.target.value)}
                leftIcon={<FiLock />}
                passwordToggle
            />

            <button css={loginButtonStyle}>로그인</button>
            <div css={socialLoginWrapperStyle}>
                <div css={dividerStyle}>간편 로그인</div>
                <div css={socialGridStyle}>
                    <button css={socialButtonStyle}>
                    <img src={googleLogo} alt="Google 로그인" css={socialIconStyle}/>
                    Google
                    </button>
                    <button css={socialButtonStyle}>
                    <FaGithub size={20} />
                    GitHub
                    </button>
                    <button css={socialButtonStyle}>
                    <img src={naverLogo} alt="Naver 로그인" css={socialIconStyle}/>
                    naver
                    </button>
                    <button css={socialButtonStyle}>
                    <img src={kakaoLogo} alt="Kakao 로그인" css={socialIconStyle}/>
                    kakao
                    </button>
                </div>
            </div>

        </div>
    </div>
);
};

export default Login

const groupStyle = css`
    display: flex;
    justify-content: space-between;
`

const modalWrapperStyle = css`
    width: 400px;
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
`;

const titleStyle = css`
    flex: 1;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
    padding-left: 15px;
`;

const subTitleStyle = css`
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
`;

const tabGroupStyle = css`
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
`;

const tabStyle = css`
    flex: 1;
    padding: 10px;
    font-weight: 600;
    background: white;
    border: none;
    cursor: pointer;
`;

const activeTabStyle = css`
    background: #f0f0f0;
`;

const formGroupStyle = css`
    display: flex;
    flex-direction: column;
`;

const labelStyle = css`
    font-size: 13px;
    margin-top: 12px;
    margin-bottom: 6px;
`;

const loginButtonStyle = css`
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
`;

const socialLoginWrapperStyle = css`
    margin-top: 24px;
`;

const dividerStyle = css`
    text-align: center;
    color: #999;
    font-size: 13px;
    margin-bottom: 12px;
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background-color: #e0e0e0;
    }

    &::before {
        left: 0;
    }
    &::after {
        right: 0;
    }
`;

const socialGridStyle = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
`;

const socialIconStyle = css`
    width: 25px;
    margin-right: 10px;
`

const socialButtonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    padding: 10px 0;
    border-radius: 8px;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background-color: #f9f9f9;
    }

    svg {
        margin-right: 8px;
    }
`;
