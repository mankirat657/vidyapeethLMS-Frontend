import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useSelector } from "react-redux";
function Navbar({ title }) {


  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [open, setOpen] = useState(false);

  const initials = user?.fullName?.firstName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="admin-navbar">

      <div className="admin-nav-left">
        <div className="flex items-center gap-2">
          <span className="text-3xl">👋</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Welcome Back <span className="text-indigo-600">{user?.fullName?.firstName || title}</span>
          </h2>
        </div>

      </div>

    

      <div className="admin-nav-right">

        <Bell size={22} className="admin-bell" />

        <div
          className="admin-profile"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="admin-avatar">{initials}</div>

          {open && (
            <div className="admin-dropdown">
              <strong>{user?.fullName?.firstName}</strong>
              <p>{user?.email}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default Navbar;