/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { css } from "@emotion/react";

interface Star {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  lifetime: number;
  age: number;
}

export function Stars() {
  const { ozPurple, text } = useThemeColors();
  const [stars, setStars] = useState<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const starIdRef = useRef(0);

  // 기본 스타일을 미리 정의 - 한 번만 생성됨
  const baseStarStyle = useMemo(
    () => css`
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      transition: opacity 0.1s ease-out;
    `,
    []
  );

  // 색상별 스타일 캐싱 - 두 개의 색상만 사용하므로 성능에 효율적
  const colorStyles = useMemo(
    () => ({
      [text]: css`
        background: ${text};
      `,
      [ozPurple]: css`
        background: ${ozPurple};
      `,
    }),
    [text, ozPurple]
  );

  const generatePosition = useCallback(
    () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }),
    []
  );

  const generateColor = useCallback(
    () => (Math.random() > 0.2 ? text : ozPurple),
    [text, ozPurple]
  );

  const createStar = useCallback(() => {
    const position = generatePosition();
    const color = generateColor();
    return {
      id: starIdRef.current++,
      x: position.x,
      y: position.y,
      color: color,
      size: Math.random() * 3 + 1,
      opacity: 0,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      lifetime: Math.random() * 3000 + 2000,
      age: 0,
    };
  }, [generatePosition, generateColor]);

  const updateStars = useCallback(() => {
    setStars((prevStars: Star[]) => {
      let newStars = prevStars.map((star: Star) => {
        const newAge = star.age + 16; // 60fps

        let newOpacity;
        const halfLife = star.lifetime / 2;

        if (newAge < halfLife) {
          newOpacity = (newAge / halfLife) * 0.8;
        } else {
          newOpacity = 0.8 * (1 - (newAge - halfLife) / halfLife);
        }

        const twinkle = Math.sin(newAge * star.twinkleSpeed) * 0.3 + 0.7;
        newOpacity *= twinkle;

        return {
          ...star,
          age: newAge,
          opacity: Math.max(0, newOpacity),
        };
      });

      newStars = newStars.filter((star) => star.age < star.lifetime);

      if (Math.random() < 0.3 && newStars.length < 150) {
        newStars.push(createStar());
      }

      return newStars;
    });
  }, [createStar]);

  useEffect(() => {
    const initialStars = Array.from({ length: 50 }, createStar);
    setStars(initialStars);

    const animate = () => {
      updateStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createStar, updateStars]);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          css={[baseStarStyle, colorStyles[star.color]]}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${
              star.opacity * 0.8
            })`,
          }}
        />
      ))}
    </>
  );
}
