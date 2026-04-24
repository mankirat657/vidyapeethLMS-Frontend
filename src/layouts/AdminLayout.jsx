import Navbar from "../components/admin/Navbar";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="layout">

      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="admin-page">

        {/* TOP NAVBAR */}
        <Navbar title="Admin Panel" />

        {/* PAGE CONTENT */}
        <div className="main-content">
          {children}
        </div>

      </div>
      

    </div>
  );
}

export default AdminLayout;