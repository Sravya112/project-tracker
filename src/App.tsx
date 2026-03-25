import { useState } from "react";
import KanbanBoard from "./components/Kanban/KanbanBoard";
import ListView from "./components/List/ListView";
import TimelineView from "./components/Timeline/TimelineView";

type View = "kanban" | "list" | "timeline";

export default function App() {
  const [view, setView] = useState<View>("kanban");

  return (
    <div>
      <div className="header">
        <button onClick={() => setView("kanban")}>Kanban</button>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("timeline")}>Timeline</button>
      </div>

      {view === "kanban" && <KanbanBoard />}
      {view === "list" && <ListView />}
      {view === "timeline" && <TimelineView />}
    </div>
  );
}
