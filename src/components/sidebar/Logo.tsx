/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

type Version = "ver.4.0" | "ver.3.5" | "ver.3.0" | "ver.2.5" | "ver.2.0-mini";

const VERSION_DESCS: Record<Version, string> = {
  "ver.4.0": "가장 강력한 모델로 일상 전반에 적합",
  "ver.3.5": "가벼운 작업은 충분히 빠르게 처리",
  "ver.3.0": "기본 모델, 문서/요약에 무난",
  "ver.2.5": "구형 모델, 버그 테스트용",
  "ver.2.0-mini": "빠르고 저렴한 경량 모델",
};

export default function Logo() {
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState<Version>("ver.4.0");
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div css={container}>
      <div css={logoContainer}>
        <a href="/" aria-label="홈" css={logoCSS}>
          로고
        </a>

        {/* 버전 드롭다운 */}
        <div ref={ref} css={{ position: "relative" }}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`버전 선택: ${version}`}
            onClick={() => setOpen((v) => !v)}
            css={dropdownBtnCSS}
          >
            {version} ▾
          </button>

          {open && (
            <ul role="listbox" aria-label="버전 선택" css={versionListCSS}>
              {(Object.keys(VERSION_DESCS) as Version[]).map((vv) => (
                <li key={vv} role="option" aria-selected={vv === version} css={listItemCSS}>
                  <button
                    type="button"
                    onClick={() => {
                      setVersion(vv);
                      setOpen(false);
                    }}
                    css={listBtnCSS}
                  >
                    <div css={itemTitleCSS}>{vv}</div>
                    <div css={itemDescCSS}>{VERSION_DESCS[vv]}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* iOS 토글 */}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "다크 모드 켜짐" : "다크 모드 꺼짐"}
        onClick={() => setIsDark((v) => !v)}
        css={switchCss(isDark)}
      >
        <span css={knobCss(isDark)} />
      </button>
    </div>
  );
}

/* ===== styles ===== */

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const logoContainer = css`
  display: flex;
  gap: 8px;
  color: #fff;
  padding: 2px;
`;

const logoCSS = css`
  color: #fff;
  font-weight: 700;
  text-decoration: none;
`;

const dropdownBtnCSS = css`
  padding: 6px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  cursor: pointer;
  line-height: 1;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.32);
  }
  &:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }
`;

const versionListCSS = css`
  width: 260px;
  position: absolute;
  top: 34px;
  left: 0;
  z-index: 999;
  padding: 6px;
  margin: 0;
  list-style: none;
  background: transparent; /* 컨테이너는 투명 유지 */
  background: rgba(0, 0, 0, 0.06);

`;

const listItemCSS = css`
  list-style: none;
  border-radius: 12px;
  margin: 6px 0;

  /* 글래스모피즘: 투명 + blur + 얇은 보더 */
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const listBtnCSS = css`
  display: flex;
  flex-direction: column; /* 제목 위, 보조문구 아래 */
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  padding: 12px 14px 10px;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
`;

const itemTitleCSS = css`
  font-size: 14px;
  font-weight: 700;
  color: #e5e7eb;
  line-height: 1.15;
`;

const itemDescCSS = css`
  font-size: 12px;
  color: #94a3b8;
`;

const switchCss = (checked: boolean) => css`
  position: relative;
  width: 48px;
  height: 28px;
  border: none;
  border-radius: 999px;
  background: ${checked ? "#484141" : "#e5e7eb"};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: background 0.2s ease;
`;
const knobCss = (checked: boolean) => css`
  position: absolute;
  top: 3px;
  left: ${checked ? "24px" : "3px"};
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  transition: left 0.2s ease;
`;
