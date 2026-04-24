import { X } from "lucide-react";

function ManageStudentModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="student-modal-overlay">

      <div className="student-modal">

        {/* 🔥 HEADER (BLACK PREMIUM CARD) */}
        <div className="student-modal-header">

          <div className="student-profile-left">
            <div className="student-avatar-large">
              {student.name[0]}
            </div>

            <div>
              <h2>{student.name}</h2>
              <p>{student.email}</p>
              <span className="student-course">{student.course}</span>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X />
          </button>

        </div>

        {/* 🔵 BODY */}
        <div className="student-modal-body">

          {/* STATS */}
          <div className="student-stats-grid">

            <div className="student-stat-card">
              <h3>{student.avgScore}%</h3>
              <p>Average Score</p>
            </div>

            <div className="student-stat-card">
              <h3>{student.tests}</h3>
              <p>Tests Given</p>
            </div>

            <div className="student-stat-card">
              <h3>{student.status}</h3>
              <p>Status</p>
            </div>

          </div>

          {/* ACTIVITY / MOCK DATA */}
          <div className="student-activity">
            <h3>Recent Activity</h3>
            <ul>
              <li>Completed Java Test - 92%</li>
              <li>Completed DBMS Quiz - 85%</li>
              <li>Logged in 2 hours ago</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageStudentModal;