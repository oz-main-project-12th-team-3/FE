/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { storeColorMode } from "../../../store/storeColorMode";
import { themeKeys } from "../../../styles/constColors";
import { ToggleBtn } from "../../utilComponents/ToggleBtn";

// export function ThemeModeBtn() {
//   const { mode, toggle } = storeColorMode();
//   const [bool, setBool] = useState(mode === themeKeys[0]);

//   useEffect(() => {
//   setBool(mode === themeKeys[0]);
// }, [mode]);

//   const handleToggle = () => {
//     setBool((v) => !v);
//     toggle();
//   };

//   return <ToggleBtn bool={bool} toggle={handleToggle} />;
// }

export function ThemeModeBtn() {
  const { mode, toggle } = storeColorMode();

  return <ToggleBtn bool={mode === themeKeys[0]} toggle={toggle} />;
}

// const positionCss = css`
//   position: absolute;
//   top:1rem;
//   right: 1rem;
// `

// export function ThemeModeBtn() {
//   const { isDark, toggle } = storeColorMode();

//   return (
//     <div css={positionCss}>
//       <ToggleBtn bool={isDark} toggle={toggle} />
//     </div>
//   );
// }
