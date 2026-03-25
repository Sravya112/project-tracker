import TaskCard from "./TaskCard";
import { useTaskStore } from "../../store/useTaskStore";
import type { Task, Status } from "../../types/task";

interface Props {
  status: Status;
  tasks: Task[];
}

export default function Column({ status, tasks }: Props) {
  const moveTask = useTaskStore((s) => s.moveTask);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("taskId");
    if (id) moveTask(id, status);
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h3>
        {status} ({tasks.length})
      </h3>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
