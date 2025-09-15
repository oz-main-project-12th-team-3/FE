import { useEffect } from "react";
import "./App.css";
import Background from "./components/background/Background";
import { useMousePositionStore } from "./store/useMousePositionStore";

function App() {
  const { setPosition} = useMousePositionStore();
  // mouse position set
  const updateMousePosition = (e: MouseEvent) => {
    setPosition(e.clientX, e.clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return <Background></Background>;
}

export default App;
