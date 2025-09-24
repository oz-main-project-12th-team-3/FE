/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function TermsModal() {
  const navigate = useNavigate();

  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const modal = css`
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    width: 500px;
    max-height: 80vh;
  `;

  const closeBtn = css`
    margin-top: 16px;
    padding: 8px 12px;
    border-radius: 6px;
    background: #333;
    color: #fff;
    cursor: pointer;
  `;

  const title = css`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  `;

  const content = css`
    font-size: 14px;
    line-height: 1.6;
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 8px;
  `;

  return (
    <div css={overlay}>
        <div css={modal}>



      <h2 css={title}>이용약관 및 개인정보 처리방침</h2>
      <div css={content}>
        <p>
          본 약관은 <strong>[서비스 이름]</strong> (이하 "회사")가 제공하는
          모든 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및
          책임사항을 규정함을 목적으로 합니다.
        </p>

        <h3>1. 약관 동의</h3>
        <p>
          회원은 본 약관에 동의함으로써 서비스를 이용할 수 있으며, 동의하지
          않을 경우 서비스 이용이 제한될 수 있습니다.
        </p>

        <h3>2. 서비스 이용</h3>
        <p>
          1) 서비스 이용은 관련 법령 및 회사 정책을 준수해야 합니다.
          <br />
          2) 회사는 시스템 점검 등으로 인해 일시적으로 서비스를 중단할 수
          있습니다.
        </p>

        <h3>3. 개인정보 수집 및 이용</h3>
        <p>
          회사는 회원가입 및 서비스 제공을 위해 최소한의 개인정보를 수집합니다.
          <br />
          수집 항목: 이름, 이메일, 비밀번호
          <br />
          수집 목적: 회원관리, 서비스 제공, 고객 문의 대응
        </p>

        <h3>4. 이용제한</h3>
        <p>
          회원이 다음 행위를 하는 경우 회사는 서비스 이용을 제한하거나 계정을
          삭제할 수 있습니다.
          <br />- 타인의 정보를 도용한 경우
          <br />- 불법 콘텐츠를 게시하거나 전송한 경우
          <br />- 서비스 운영을 방해한 경우
        </p>

        <h3>5. 책임 제한</h3>
        <p>
          회사는 천재지변, 불가항력적인 사유로 인한 서비스 장애에 대해서는
          책임을 지지 않습니다.
        </p>

        <h3>6. 약관 변경</h3>
        <p>
          회사는 필요 시 본 약관을 변경할 수 있으며, 변경 사항은 서비스 내
          공지사항 등을 통해 안내합니다.
        </p>
      </div>

      <button css={closeBtn} onClick={() => navigate("/modal/auth")}>
        뒤로가기
      </button>
        </div>
    </div>
  );
}
