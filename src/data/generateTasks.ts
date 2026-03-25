import type { Task } from "../types/task";

const priorities = ["low", "medium", "high", "critical"] as const;
const statuses = ["todo", "inprogress", "review", "done"] as const;

export const generateTasks = (count: number): Task[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i),
    title: `Task ${i}`,
    assignee: ["Rakesh Agarwal", "John Doe", "Meera Sharma", "Rahul Kumar"][i % 4],
    priority: priorities[i % 4],
    status: statuses[i % 4],
    startDate: "2026-03-01",
    dueDate: `2026-03-${(i % 28) + 1}`,
  }));
