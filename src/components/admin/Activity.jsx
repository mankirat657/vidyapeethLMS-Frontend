import { useState } from "react";
import ActivityItem from "./ActivityItem";

function Activity() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const activities = [
    {
      id: 1,
      type: "student",
      title: "Aman Sharma",
      description: "registered on the platform",
      time: "5 min ago",
      details: "Aman created a new account using email login.",
      unread: true
    },
    {
      id: 2,
      type: "test",
      title: "React Test",
      description: "was submitted by Priya",
      time: "15 min ago",
      details: "Score: 82% | Duration: 32 mins",
      unread: true
    },
    {
      id: 3,
      type: "course",
      title: "New Course",
      description: "DSA Basics was added",
      time: "30 min ago",
      details: "Includes 45 videos and 120 questions.",
      unread: false
    },
    {
      id: 4,
      type: "alert",
      title: "Question flagged",
      description: "reported by a student",
      time: "1 hour ago",
      details: "Flag reason: Incorrect answer explanation.",
      unread: true
    }
  ];

  const filtered =
    filter === "all"
      ? activities
      : activities.filter((a) => a.type === filter);

  return (
    <div className="admin-activity-container">

      {/* HEADER */}
      <div className="activity-header">

        <h2>Recent Activity</h2>

        <div className="activity-actions">
          <span className="mark-read">Mark all as read</span>
          <button className="mark-read">
            Mark all as read
          </button>
        </div>
        <div className="activity-tabs">
          {["all", "student", "test", "course", "alert"].map((tab) => (
            <button
              key={tab}
              className={`tab ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

      </div>

      {/* LIST */}
      <div className="activity-list">
        {filtered.map((item, index) => (
          <ActivityItem
            key={item.id}
            activity={item}
            index={index}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>
      {selected && (
        <div className="activity-modal-overlay" onClick={() => setSelected(null)}>
          <div className="activity-modal" onClick={(e) => e.stopPropagation()}>

            <h3>{selected.title}</h3>
            <p className="modal-time">{selected.time}</p>

            <p className="modal-desc">{selected.description}</p>

            <div className="modal-details">
              {selected.details}
            </div>

            <button onClick={() => setSelected(null)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Activity;