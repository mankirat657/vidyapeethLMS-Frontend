import { NavLink, useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import {
  LayoutDashboard,
  FileQuestion,
  GraduationCap,
  LogOut,
  ChevronRight,
  Bell,
} from "lucide-react";
import "./StudentSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "../store/actions/AuthAction";
import { toast } from "react-toastify";
import { getAllTest } from "../store/actions/TestAction";

function StudentSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [notifications, setNotifications] = useState([]);

  const menuItems = [
    {
      to: "/student/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/student/tests",
      icon: FileQuestion,
      label: "Tests",
      badge: "new",
    },
    {
      to: "/student/question-bank",
      icon: GraduationCap,
      label: "Question Bank",
      badge: "new",
    },
  ];

  // Fetch already published tests
  useEffect(() => {
    async function fetchPublishedTests() {
      const res = await dispatch(getAllTest());

      console.log("API Response:", res);

      const allTests = res?.test || [];

      console.log("All Tests:", allTests);

      const publishedTests = allTests.filter(
        (test) => test.isPublished === true
      );

      console.log("Published Tests:", publishedTests);

      setNotifications(publishedTests);
    }

    fetchPublishedTests();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      socket.emit("join-student-room");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
     socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });
    socket.on("testPublished", (newTest) => {
      console.log("Received published test:", newTest);

      setNotifications((prev) => {
        const exists = prev.some(
          (test) => test._id === newTest._id
        );

        if (exists) return prev;

        return [...prev, newTest];
      });

      toast.success("New test has been published!");
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("testPublished");
      socket.disconnect();
    };
  }, [user]);

  async function logoutStudent() {
    const res = await dispatch(logoutUser());

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res?.message || "Logout successfully");
    navigate("/", { replace: true });
  }

  console.log("Notifications:", notifications);

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

        <div className="logo-badge relative hover:cursor-pointer">
          <Bell size={22} />

          <div className="noBadge absolute w-5 h-5 rounded-full bg-red-500 flex items-center justify-center top-[-.5rem] right-[-1rem] text-white text-xs font-bold">
            {notifications.length}
          </div>
        </div>
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-user">
        <div className="user-avatar">
          <img src={user?.picture} alt="" />
        </div>

        <div className="user-info">
          <p className="user-name">
            {user?.fullName?.firstName}
          </p>
          <p className="user-role">Student</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "sidebar-nav-link active"
                : "sidebar-nav-link"
            }
          >
            <div className="nav-icon-wrapper">
              <item.icon size={20} />
            </div>

            <span className="nav-label">{item.label}</span>

            {item.badge && (
              <span className="nav-badge">
                {item.badge}
              </span>
            )}

            <ChevronRight
              size={16}
              className="nav-arrow"
            />
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logoutStudent}
        className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 flex items-center gap-3 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
      >
        <LogOut className="relative z-10 text-white text-xl" />
        <h1 className="relative z-10 text-white font-semibold tracking-wide">
          Logout
        </h1>
      </button>
    </div>
  );
}

export default StudentSidebar;