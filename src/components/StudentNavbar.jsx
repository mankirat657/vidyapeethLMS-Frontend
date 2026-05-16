function StudentNavbar() {

  return (

    <nav className="student-navbar">

      {/* Logo */}

      <div className="navbar-logo">

        <h2>LMS Portal</h2>

      </div>

      {/* Navigation Links */}

      <div className="navbar-links">

        <button className="nav-link">
          Dashboard
        </button>

        <button className="nav-link">
          Tests
        </button>

        <button className="nav-link">
          Knowledge Bank
        </button>

      </div>

      {/* Profile */}

      <div className="navbar-profile">

        <div className="profile-circle">
          S
        </div>

      </div>

    </nav>

  );
}

export default StudentNavbar;