import { useTaskStore } from "../../store/useTaskStore";
import Column from "./Column";
import type { Status, Task } from "../../types/task";

const columns: Status[] = ["todo", "inprogress", "review", "done"];

export default function KanbanBoard() {
  const tasks: Task[] = useTaskStore((s) => s.tasks);

  return (
    <div className="kanban">
      {columns.map((col) => (
        <Column
          key={col}
          status={col}
          tasks={tasks.filter((t) => t.status === col)}
        />
      ))}
    </div>
  );
}
