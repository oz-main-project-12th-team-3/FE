import { useEffect } from "react";
import "./App.css";
import Background from "./components/Background";
import { setMousePosition } from "./hooks/useMousePosition";

function App() {

  // mouse position set
  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition(e.clientX, e.clientY);
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
