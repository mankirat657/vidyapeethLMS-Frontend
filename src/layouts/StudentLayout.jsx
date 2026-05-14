import Sidebar from "../components/Sidebar";
import StudentSidebar from "../components/StudentSidebar";

function StudentLayout({ children }) {
  return (
    <div className="layout">
      <StudentSidebar role="student" />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default StudentLayout;