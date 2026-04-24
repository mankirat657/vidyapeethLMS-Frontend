import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Student Portal</h2>

      <Link to="/student/dashboard" className="sidebar-link">
        Dashboard
      </Link>

      <Link to="/student/courses" className="sidebar-link">
        Courses
      </Link>

      <Link to="/student/tests" className="sidebar-link">
        Tests
      </Link>

      <Link to="/student/question-bank" className="sidebar-link">
        Question Bank
      </Link>
    </div>
  );
}

export default Sidebar;