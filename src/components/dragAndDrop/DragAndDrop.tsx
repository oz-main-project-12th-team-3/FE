/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from "react";
import { DragPreview } from "./DragPreview";
import { motion } from "framer-motion";
import { useMousePositionStore } from "../../store/useMousePositionStore";

interface DragAndDropProps<T = unknown> {
  items: T[];
  onItemsChange: (newItems: T[]) => void;
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
  >[];
  dragTitle: keyof T;
}

type DragHandler = (e: React.DragEvent<HTMLElement>, index: number) => void;

/**
 * 드래그 앤 드롭 기능을 제공하는 React 컴포넌트.
 * 제네릭 타입 `T`를 사용하여 다양한 데이터 구조를 지원하며,
 * 주어진 항목(`items`)을 드래그하여 순서를 변경할 수 있다.
 * 드래그 프리뷰에 표시될 텍스트는 `dragTitle`로 지정된 속성에서 가져온다.
 *
 * @template T - 드래그할 항목의 타입
 * @param {DragAndDropProps<T>} props - 컴포넌트 속성
 * @param {T[]} props.items - 드래그할 항목 배열
 * @param {(newItems: T[]) => void} props.onItemsChange - 항목 순서 변경 시 호출되는 콜백
 * @param {React.ReactElement<React.HTMLAttributes<HTMLElement>>[]} props.children - 렌더링할 자식 요소
 * @param {keyof T} props.dragTitle - 드래그 프리뷰에 표시할 `T`의 속성 키 !반드시 키를 문자열로 전달할 것!
 * @returns {JSX.Element} 드래그 앤 드롭 인터페이스를 포함한 React 컴포넌트
 * @example
 * ```tsx
 * const [items, setItems] = useState([
 *   { id: 1, title: "Item 1", value: "Value 1" },
 *   { id: 2, title: "Item 2", value: "Value 2" },
 * ]);
 * <DragAndDrop items={items} onItemsChange={setItems} dragTitle="title">
 *   {items.map((el) => <div key={el.id}>{el.value}</div>)}
 * </DragAndDrop>
 * ```
 */
export default function DragAndDrop<T>({
  items,
  onItemsChange,
  children,
  dragTitle,
}: DragAndDropProps<T>) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragText, setDragText] = useState<string>(""); // dragTitle로 지정된 키에 할당된 값을 사용
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [localItems, setLocalItems] = useState<T[]>(items); // 부드러운 애니메이션을 위해 아이템 로컬에서 제어
  const dragElementRef = useRef<HTMLElement>(null); // 투명도 등 스타일 제어
  const emptyImg = createEmptyImg(); // 드래깅 디폴트 이미지 제거

  // 드래그 시작
  const handleDragStart: DragHandler = (e, index) => {
    setIsDragging(true);
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.setDragImage(emptyImg, 0, 0);

    const target = e.target as HTMLElement;
    dragElementRef.current = target;
    setDragText(String(items[index][dragTitle]));
    target.style.opacity = "0.3";
  };

  // 드래그 오버
  const handleDragOver: DragHandler = (e, index) => {
    e.preventDefault();
    const { y } = useMousePositionStore.getState().mousePosition;

    // 상태변수들 유효성 검사
    if (!y) return;
    if (dragIndex === null || dragIndex === index) return;

    const target = e.currentTarget as HTMLElement;
    // 요소의 중심선을 기준으로 드래그 반응 위/아래 나누기
    const rect = target.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const newDropIndex = y < midpoint ? index : index + 1;
    const adjustedDropIndex =
      newDropIndex > dragIndex ? newDropIndex - 1 : newDropIndex;

    const newItems = moveItem(localItems, dragIndex, adjustedDropIndex);

    setLocalItems(newItems);
    setDragIndex(adjustedDropIndex);
    onItemsChange(newItems);
  };

  // 드롭
  const handleDrop: DragHandler = (e, _index) => {
    e.preventDefault();
    setIsDragging(false);
    setDragIndex(null);
    setDragText("");
    if (dragElementRef.current) {
      dragElementRef.current.style.opacity = "1";
      dragElementRef.current = null;
    }
  };

  // 드래그 엔드
  const handleDragEnd: DragHandler = (e, _index) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    setIsDragging(false);
    setDragIndex(null);
    setDragText("");
    if (dragElementRef.current) {
      dragElementRef.current = null;
    }
  };

  // 자식 요소 렌더링
  const renderItems = () =>
    React.Children.map(children, (child, index) => {
      const itemKey = child.key ?? index;
      return (
        <motion.div
          key={itemKey}
          layout 
          transition={{ type: "spring", stiffness: 500, damping: 40 }} 
        >
          <React.Fragment key={itemKey}>
            {React.cloneElement(child, {
              draggable: true,
              onDragStart: (e: React.DragEvent<HTMLElement>) =>
                handleDragStart(e, index),
              onDragOver: (e: React.DragEvent<HTMLElement>) =>
                handleDragOver(e, index),
              onDrop: (e: React.DragEvent<HTMLElement>) => handleDrop(e, index),
              onDragEnd: (e: React.DragEvent<HTMLElement>) =>
                handleDragEnd(e, index),
            })}
          </React.Fragment>
        </motion.div>
      );
    });

  return (
    <div>
      {renderItems()}
      <DragPreview label={dragText} isVisible={isDragging} />
    </div>
  );
}

/**
 * 1x1 크기의 빈 캔버스를 생성하여 드래그 시 기본 이미지를 제거하는 데 사용.
 * @returns {HTMLCanvasElement} 1x1 크기의 빈 캔버스 요소
 */
function createEmptyImg() {
  const emptyImg = document.createElement("canvas");
  emptyImg.width = 1;
  emptyImg.height = 1;
  return emptyImg;
}

/**
 * 
 * @param arr 
 * @param from 
 * @param to 
 * @returns {Array}
 */
function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const item = arr[from];
  const newArr = arr.filter((_, i) => i !== from); 
  newArr.splice(to, 0, item); 
  return newArr;
}