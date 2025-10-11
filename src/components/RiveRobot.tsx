/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  StateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  SIDEBAR_MARGIN,
  useMousePositionStore,
} from "../store/useMousePositionStore";

const STATE_MACHINE_NAME = "State Machine 1";

export function RiveRobot() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { rive, RiveComponent } = useRive({
    src: "/riveFiles/box_robot.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });
  const { whereIsMouse } = useMousePositionStore();

  const robotX = useMemo(() => {
    const positions = {
      center: 0,
      left: SIDEBAR_MARGIN,
      right: -SIDEBAR_MARGIN*2,
    };
    return positions[whereIsMouse] ?? 0;
  }, [whereIsMouse]);

  useEffect(() => {
    if (!rive || !containerRef.current) return;

    const inputs = rive.stateMachineInputs(STATE_MACHINE_NAME) ?? [];
    const enterexit = inputs.find(
      (i: StateMachineInput) => i.name === "enterexit"
    );

    if (!enterexit) {
      return;
    }

    const onEnter = () => {
      enterexit.value = true;
    };

    const onLeave = () => {
      enterexit.value = false;
    };

    const el = containerRef.current;
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [rive]);

  return (
    <motion.div
      ref={containerRef}
      css={RobotCss}
      initial={{ x: 0 }}
      animate={{
        x: robotX,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <RiveComponent style={{ pointerEvents: "auto" }} />
    </motion.div>
  );
}

const RobotCss = css`
  position: fixed;
  bottom: 2rem;
  right: 10rem;
  height: 10rem;
  width: 10rem;
  z-index: 1;
  pointer-events: none;
`;
