import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  GraduationCap,
  Award,
  LogOut,
  Settings,
  User,
  ChevronRight,
  Sparkles
} from "lucide-react";
import "./StudentSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBankData } from "../store/actions/StudentBankDataActions";
import { logoutUser } from "../store/actions/AuthAction";
import { toast } from "react-toastify";

function StudentSidebar() {
  
  const menuItems = [
    { to: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
    { to: "/student/tests", icon: FileQuestion, label: "Tests", badge: "new" },
    { to: "/student/question-bank", icon: GraduationCap, label: "Question Bank", badge: null,badge: "new"  },
  ];
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function logoutStudent(){
     const res = await dispatch(logoutUser());
    
        if(res?.error){
          toast.error(res?.error);
        }
        toast.success(res?.message || "Logout successfully");
        navigate("/",{replace : true});
  }
  return (
    <div className="student-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <GraduationCap size={28} />
        </div>
        <div className="logo-text">
          <h2>Student</h2>
          <span>Portal</span>
        </div>
        <div className="logo-badge">
          <Sparkles size={12} />
        </div>
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-user">
        <div className="user-avatar">
          <img src={user?.picture}  alt="" />
        </div>
        <div className="user-info">
          <p className="user-name">{user?.fullName?.firstName}</p>
          <p className="user-role">Student</p>
        </div>
      </div>

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
              <span className="nav-badge">{item.badge}</span>
            )}
            <ChevronRight size={16} className="nav-arrow" />
          </NavLink>
        ))}
      </nav>
    <button onClick={logoutStudent} className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-500 to-red-600  flex items-center gap-3 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50">
  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
  <LogOut className="relative z-10 text-white text-xl group-hover:rotate-12 transition-transform duration-300" />
  <h1 className="relative z-10 text-white font-semibold tracking-wide">Logout</h1>
</button>
    
    </div>
  );
}

export default StudentSidebar;