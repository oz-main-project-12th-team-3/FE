import { storeColorMode } from "../../../store/storeColorMode";
import { themeKeys } from "../../../styles/constColors";
import { ToggleBtn } from "../../utilComponents/ToggleBtn";

export function ThemeModeBtn() {
  const { mode, toggle } = storeColorMode();

  return <ToggleBtn bool={mode === themeKeys[0]} toggle={toggle} />;
}
