/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useMousePositionStore } from "../../store/useMousePositionStore";
import { flexCenter } from "../../styles/mixins";
import { useEffect, useRef } from "react";

interface DragPreviewProps {
  label: string;
  isVisible: boolean;
}

export function DragPreview({ label, isVisible }: DragPreviewProps) {
  const { text } = useThemeColors();
  const boxRef = useRef<HTMLDivElement | null>(null);

  let rafId: number | null = null;

  const updatePosition = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      // 내부에서 재구독 > 리랜더링 유발
      const { x, y } = useMousePositionStore.getState().mousePosition;
      if (x === null || y === null || !boxRef.current) {
        rafId = null;
        return;
      }

      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;

      rafId = null;
    });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition(); // 이거 안하면 1프레임씩 삑사리남...
    }
    window.addEventListener("dragover", updatePosition);
    return () => {
      window.removeEventListener("dragover", updatePosition);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isVisible]);

  // 상태 변수에 따라 유동적으로 적용
  const colorCss = css`
    color: ${text};
    border: 1px solid ${text};
  `;

  return (
    <>
      {isVisible  && (
        <div
          css={[flexCenter(), dragCss, colorCss]}
          ref={boxRef}
        >
          {label}
        </div>
      )}
    </>
  );
}

// 재지정되지 않아도 되는 고정스타일속성
const dragCss = css`
  backdrop-filter: blur(3px);
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  transform: translate(-50%, -50%) scale(0.7);
`;
