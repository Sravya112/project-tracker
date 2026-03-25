import { useState } from "react";
import type { Task } from "../../types/task";

export const useVirtualScroll = (items: Task[]) => {
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = 50;
  const visible = 12;

  const start = Math.floor(scrollTop / rowHeight);
  const end = start + visible;

  return {
    visibleItems: items.slice(start, end),
    totalHeight: items.length * rowHeight,
    offset: start * rowHeight,
    onScroll: (e: React.UIEvent<HTMLDivElement>) =>
      setScrollTop(e.currentTarget.scrollTop),
  };
};
