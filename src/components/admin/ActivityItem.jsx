import {
  User,
  ClipboardList,
  BookOpen,
  AlertTriangle
} from "lucide-react";

function ActivityItem({ activity, index, onClick }) {

  const getIcon = () => {
    switch (activity.type) {
      case "student": return "👤";
      case "test": return "📝";
      case "course": return "📚";
      case "alert": return "⚠️";
      default: return "📌";
    }
  };

  return (
    <div
      className={`activity-card ${activity.type} ${activity.unread ? "unread" : ""}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.08}s` }}
    >

      {/* STATUS DOT */}
      {activity.unread && <div className="activity-status"></div>}

      {/* ICON */}
      <div className="activity-icon">
        {getIcon()}
      </div>

      {/* CONTENT */}
      <div className="activity-content">

        <div className="activity-header-line">
          <span className="activity-title">{activity.title}</span>
          <span className="activity-time">{activity.time}</span>
        </div>

        <div className="activity-desc">
          {activity.description}
        </div>

      </div>

    </div>
  );
}

export default ActivityItem;