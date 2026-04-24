import Sidebar from "../components/Sidebar";

function StudentLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar role="student" />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default StudentLayout;