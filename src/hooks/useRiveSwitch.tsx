import { useRive } from "@rive-app/react-canvas";

export function useRiveSwitch() {
  const { rive, RiveComponent } = useRive({
    src: "mode_switch.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  const toggle = () => {
    const input = rive
      ?.stateMachineInputs("State Machine 1")
      .find((i) => i.name === "isPlaying");
    if (input) input.value = !input.value;
  };

  return { RiveComponent, toggle };
}
