import StudentLayout from "../layouts/StudentLayout";

function StudentDashboard() {
  return (
    <StudentLayout>
      <div className="dashboard-header">
        Student Dashboard
      </div>

      <div className="card-grid">

        <div className="dashboard-card">
          <h3>Enrolled Courses</h3>
          <div className="card-number">5</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Tests</h3>
          <div className="card-number">2</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "40%" }}></div>
          </div>
          <button className="btn-primary">View Schedule</button>
        </div>

        <div className="dashboard-card">
          <h3>Completed Tests</h3>
          <div className="card-number">8</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "90%" }}></div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Question Bank</h3>
          <div className="card-number">120</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "60%" }}></div>
          </div>
        </div>

      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;