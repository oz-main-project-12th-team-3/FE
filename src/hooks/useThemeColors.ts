import { storeColorMode } from "../store/storeColorMode";
import { colors } from "../styles/constColors";


export const useThemeColors = () => {
  const mode = storeColorMode((state) => state.mode);
  return colors[mode];
};

// const {text·background}= useThemeColors(); 컴포넌트 내에선 이렇게 사용