import { create } from "zustand";
import type { Task, Status } from "../types/task";
import { generateTasks } from "../data/generateTasks";

interface State {
  tasks: Task[];
  moveTask: (id: string, status: Status) => void;
}

export const useTaskStore = create<State>((set) => ({
  tasks: generateTasks(200),

  moveTask: (id, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}));
