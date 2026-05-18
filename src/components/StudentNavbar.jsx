import { Bell, ChevronDown, LogOut, UserPlus, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import maleAvatar from "../assets/defaultAvatars/boy.png";
import femaleAvatar from "../assets/defaultAvatars/woman.png";





function StudentNavbar({
  analyticsRef,
  testsRef,
  knowledgeRef,
  activeSection,
}) {
  
  const user = useSelector((state) => state.auth.user);

  const profilePic =
  user?.profileImage ||
  (user?.gender === "Female"
    ? femaleAvatar
    : maleAvatar);

  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav className="student-navbar">

      <div className="nav-logo">
        CourseMate 
      </div>

      <div className="navbar-links">

  <button
    className={
      activeSection === "dashboard"
        ? "nav-link active-nav"
        : "nav-link"
    }
    onClick={() => scrollToSection(analyticsRef)}
  >
    Progress Track
  </button>

  <button
    className={
      activeSection === "tests"
        ? "nav-link active-nav"
        : "nav-link"
    }
    onClick={() => scrollToSection(testsRef)}
  >
    Tests
  </button>

  <button
    className={
      activeSection === "knowledge"
        ? "nav-link active-nav"
        : "nav-link"
    }
    onClick={() => scrollToSection(knowledgeRef)}
  >
    Knowledge Bank
  </button>

</div>

      <div className="nav-right">

        {/* Notification Bell */}

        <div className="notification-wrapper">

          <Bell size={22} className="notification-icon" />

          <span className="notification-badge">
            3
          </span>

        </div>

        {/* Profile */}

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <div
            className="profile-trigger"
            onClick={() =>
              setOpenProfile(!openProfile)
            }
          >

            <img
              src={profilePic}
              alt="profile"
              className="profile-avatar"
            />

            <ChevronDown size={18} />

          </div>

          {openProfile && (

            <div className="profile-dropdown">

              <div className="profile-header">

                <img
                  src={profilePic}
                  alt="profile"
                  className="dropdown-avatar"
                />

                <h3>
                  {user?.name || "Dev Student"}
                </h3>

                <p>
                  B.Tech CSE
                </p>

                <span>
                  Active for 2h 14m
                </span>

              </div>

              <div className="dropdown-options">

                <button>

                  <Camera size={18} />

                  Change Profile Pic

                </button>

                <button>

                  <UserPlus size={18} />

                  Add Another Account

                </button>

                <button className="logout-btn">

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default StudentNavbar;