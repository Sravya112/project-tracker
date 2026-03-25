import { useTaskStore } from "../../store/useTaskStore";
import type { Task } from "../../types/task";

const DAY_WIDTH = 40;

export default function TimelineView() {
  const tasks: Task[] = useTaskStore((s) => s.tasks);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();

  return (
    <div className="timeline-wrapper">
   
      <div className="timeline-labels">
        {tasks.map((t) => (
          <div key={t.id} className="timeline-row-label">
            {t.title}
          </div>
        ))}
      </div>
      <div className="timeline-content">
        <div className="timeline-header">
          {days.map((d) => (
            <div key={d} className="day">
              {d}
            </div>
          ))}
        </div>
        <div className="timeline-body">

          <div className="today" style={{ left: today * DAY_WIDTH }} />

          {tasks.map((t) => {
            const start = new Date(t.startDate || t.dueDate).getDate();
            const end = new Date(t.dueDate).getDate();

            return (
              <div className="timeline-row" key={t.id}>
                <div
                  className={`bar ${t.priority}`}
                  style={{
                    left: start * DAY_WIDTH,
                    width: (end - start + 1) * DAY_WIDTH,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
