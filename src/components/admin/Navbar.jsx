import { useState, useRef, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { MdRememberMe } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/AuthAction";
import { toast } from "react-toastify";

function Navbar({ title }) {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials = user?.fullName?.firstName
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = async() => {
    const res = await dispatch(logoutUser());

    if(res?.error){
      toast.error(res?.error);
    }
    toast.success(res?.message || "Logout successfully");
    navigate("/");
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

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
        <Bell size={22} className="admin-bell cursor-pointer" />

        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <div
            className="admin-profile cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="admin-avatar">{initials || 'U'}</div>
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="padding border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {user?.fullName?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.fullName?.firstName || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email || 'No email'}</p>
                  </div>
                </div>
              </div>

              <div
                onClick={handleLogout}
                className="w-full flex items-center gap-3 padding hover:bg-red-50  cursor-pointer"
              >
                <IoLogOut className="text-red-600 text-xl" />
                <span className="text-gray-700 font-medium">Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;