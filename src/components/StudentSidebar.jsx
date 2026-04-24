import { Link } from "react-router-dom";

function StudentSidebar() {
  return (
    <div className="sidebar">
      <h2>Student Portal</h2>
      <Link className="sidebar-link" to="/student/dashboard">Dashboard</Link>
      <Link className="sidebar-link" to="/student/courses">Courses</Link>
      <Link className="sidebar-link" to="/student/tests">Tests</Link>
      <Link className="sidebar-link" to="/student/question-bank">Question Bank</Link>
    </div>
  );
}

export default StudentSidebar;