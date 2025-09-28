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
      <div className="logo-row">
        <a href="/" aria-label="홈" className="logo">로고</a>

        {/* 버전 드롭다운 */}
        <div ref={ref} className="dd">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`버전 선택: ${version}`}
            onClick={() => setOpen(v => !v)}
            className="dd-btn"
          >
            {version} ▾
          </button>

          {open && (
            <ul role="listbox" aria-label="버전 선택" className="dd-list">
              {(Object.keys(VERSION_DESCS) as Version[]).map((vv) => (
                <li key={vv} role="option" aria-selected={vv === version} className="dd-item">
                  <button
                    type="button"
                    onClick={() => { setVersion(vv); setOpen(false); }}
                    className="dd-item-btn"
                  >
                    <div className="dd-title">{vv}</div>
                    <div className="dd-desc">{VERSION_DESCS[vv]}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* iOS 스타일 스위치 */}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "다크 모드 켜짐" : "다크 모드 꺼짐"}
        onClick={() => setIsDark(v => !v)}
        className="switch"
        data-checked={isDark}
      >
        <span className="knob" />
      </button>
    </div>
  );
}

/* styles: 한 곳에서 자식 전부 관리 */
const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .logo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    padding: 2px;
  }

  .logo {
    color: #fff;
    font-weight: 700;
    text-decoration: none;
  }

  /* dropdown */
  .dd { position: relative; }
  .dd-btn {
    padding: 6px 10px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    cursor: pointer;
    line-height: 1;
  }
  .dd-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.32);
  }
  .dd-btn:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  .dd-list {
    width: 260px;
    position: absolute;
    top: 34px;
    left: 0;
    z-index: 999;
    padding: 6px;
    margin: 0;
    list-style: none;
    background: rgba(0, 0, 0, 0.06);
  }

  .dd-item {
    border-radius: 12px;
    margin: 6px 0;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .dd-item:hover { background: rgba(255, 255, 255, 0.2); }

  .dd-item-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    padding: 12px 14px 10px;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;
    color: inherit;
  }

  .dd-title { font-size: 14px; font-weight: 700; color: #e5e7eb; line-height: 1.15; }
  .dd-desc  { font-size: 12px; color: #94a3b8; }

  /* switch */
  .switch {
    position: relative;
    width: 48px;
    height: 28px;
    border: none;
    border-radius: 999px;
    background: #e5e7eb;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .switch[data-checked="true"] { background: #484141; }

  .knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.18);
    transition: left 0.2s ease;
  }
  .switch[data-checked="true"] .knob { left: 24px; }
`;
