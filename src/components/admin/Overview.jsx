import { Users, BookOpen, ClipboardList, Database } from "lucide-react";

function Overview() {
  return (
    <div className="card-grid">

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Total Students</h3>
            <div className="card-number">1200</div>
          </div>
          <Users size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Total Courses</h3>
            <div className="card-number">32</div>
          </div>
          <BookOpen size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Total Tests</h3>
            <div className="card-number">87</div>
          </div>
          <ClipboardList size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Question Bank</h3>
            <div className="card-number">450</div>
          </div>
          <Database size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

    </div>
  );
}

export default Overview;