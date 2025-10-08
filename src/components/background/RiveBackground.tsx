/** @jsxImportSource @emotion/react */
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";
import { storeColorMode } from "../../store/storeColorMode";
import { css } from "@emotion/react";

const STATE_MACHINE_NAME = "State Machine 1";
const INPUT_NAME = "Theme toggled";

export function RiveBackGround() {
  const { isDark } = storeColorMode();
  const { rive, RiveComponent } = useRive({
    src: "/riveFiles/dark_light_theme.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const themeToggleInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );

  useEffect(() => {
    if (themeToggleInput) themeToggleInput.value = isDark;
  }, [isDark, themeToggleInput]);

  return (
    <div css={RiveComponentWrapper}>
      <RiveComponent />
    </div>
  );
}
const RiveComponentWrapper = css`
  position: fixed;
  inset: 0;
  pointer-events: none;
`;
