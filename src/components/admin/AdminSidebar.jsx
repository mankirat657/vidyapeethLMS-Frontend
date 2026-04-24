import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Database,
  ClipboardList,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Award
} from "lucide-react";
import { useState } from "react";

function AdminSidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
    { to: "/admin/manage-students", icon: Users, label: "Manage Students", badge: "New" },
    { to: "/admin/question-bank", icon: Database, label: "Question Bank", badge: "AI" },
    { to: "/admin/create-test", icon: ClipboardList, label: "Create Test", badge: "AI" },
  ];

  return (
    <div className="admin-sidebar" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="sidebar-logo">
        <div className="logo-icon">
          <GraduationCap size={32} />
        </div>
        <div className="logo-text">
          <h2>Admin</h2>
          <span>Panel</span>
        </div>
        <div className="logo-badge">
          <Sparkles size={12} />
        </div>
      </div>

      <div className="sidebar-divider"></div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-nav-link active" : "sidebar-nav-link"
            }
          >
            <div className="nav-icon-wrapper">
              <item.icon size={20} />
            </div>
            <span className="nav-label">{item.label}</span>
            {item.badge && (
              <span className={`nav-badge ${item.badge === 'AI' ? 'ai-badge' : 'new-badge'}`}>
                {item.badge}
              </span>
            )}
            <ChevronRight size={16} className="nav-arrow" />
          </NavLink>
        ))}
      </nav>

     
     
    </div>
  );
}

export default AdminSidebar;