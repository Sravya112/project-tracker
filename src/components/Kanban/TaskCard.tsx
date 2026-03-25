import type { Task } from "../../types/task";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
    const getInitials = (name: string) => {
      const parts = name.split(" ");
      return parts
        .map((p) => p[0])
        .join("")
        .toUpperCase();
    };
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.currentTarget.classList.add("dragging");
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove("dragging");
      }}
    >
      <h4>{task.title}</h4>
      <div className="meta">{task.assignee}</div>
      <div className={`badge ${task.priority}`}>{task.priority}</div>
      <div className="meta">{task.dueDate}</div>

      <div className="avatar">{getInitials(task.assignee)}</div>
    </div>
  );
}
