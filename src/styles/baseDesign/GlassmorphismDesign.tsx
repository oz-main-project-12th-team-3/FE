/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";

export function GlassmorphismDesign({
  children,
}: {
  children: React.ReactNode;
}) {
  const { text } = useThemeColors();

  const color = css`
    border: 1px solid ${text};
  `;
  return <div css={[glassSt, color]}>{children}</div>;
}

const glassSt = css`
  background-color: "#0000000";
  backdrop-filter: blur(6px);
  border-radius: 1rem;
  padding: 1rem;
  width: fit-content;
`;
