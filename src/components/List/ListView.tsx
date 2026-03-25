import { useTaskStore } from "../../store/useTaskStore";
import { useVirtualScroll } from "./useVirtualScroll";
import { useState } from "react";
import type { Task } from "../../types/task";

type SortKey = "title" | "priority" | "dueDate";
type Direction = "asc" | "desc";

export default function ListView() {
  const tasks: Task[] = useTaskStore((s) => s.tasks);

  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [direction, setDirection] = useState<Direction>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

const sorted = [...tasks].sort((a, b) => {
  let valA = a[sortKey] as any;
  let valB = b[sortKey] as any;

  if (sortKey === "priority") {
    const order: Record<"critical" | "high" | "medium" | "low", number> = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
    };

    valA = order[valA as keyof typeof order];
    valB = order[valB as keyof typeof order];
  }

  if (sortKey === "dueDate") {
    valA = new Date(valA).getTime();
    valB = new Date(valB).getTime();
  }

  return direction === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
});

  const { visibleItems, totalHeight, offset, onScroll } =
    useVirtualScroll(sorted);

  return (
    <div className="list" onScroll={onScroll}>
      <div className="row header-row">
        <span onClick={() => handleSort("title")}>Title</span>
        <span>Assignee</span>
        <span onClick={() => handleSort("priority")}>Priority</span>
        <span onClick={() => handleSort("dueDate")}>Due Date</span>
      </div>

      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offset}px)` }}>
          {visibleItems.map((t) => (
            <div key={t.id} className="row">
              <span>{t.title}</span>
              <span>{t.assignee}</span>
              <span className={`badge ${t.priority}`}>{t.priority}</span>
              <span>{t.dueDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
