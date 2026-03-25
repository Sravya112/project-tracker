import { useRef } from "react";

export const useDrag = () => {
  const dragId = useRef<string | null>(null);

  const onDragStart = (id: string) => {
    dragId.current = id;
  };

  const onDrop = (status: any, move: any) => {
    if (dragId.current) {
      move(dragId.current, status);
      dragId.current = null;
    }
  };

  return { onDragStart, onDrop };
};
