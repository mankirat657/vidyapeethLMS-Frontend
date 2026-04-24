import { BookOpen, Clock, CheckCircle, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function StudentDashboard() {

  const navigate = useNavigate();

  const upcomingTests = [
    {
      id: 1,
      name: "React Midterm",
      course: "Web Development",
      date: "12 April",
      duration: "60 mins"
    },
    {
      id: 2,
      name: "Java Quiz",
      course: "Programming",
      date: "15 April",
      duration: "30 mins"
    }
  ];

  return (
    <div className="layout">

      <StudentSidebar />

      <div className="main-content">

        <h1 className="dashboard-header">Student Dashboard</h1>

        {/* Stats Cards */}
        <div className="card-grid">

          <div className="dashboard-card modern-card">
            <div className="card-content">
              <div>
                <h3>Enrolled Courses</h3>
                <div className="card-number">5</div>
              </div>
              <BookOpen size={50} className="card-icon" />
            </div>
          </div>

          <div className="dashboard-card modern-card">
            <div className="card-content">
              <div>
                <h3>Upcoming Tests</h3>
                <div className="card-number">2</div>
              </div>
              <Clock size={50} className="card-icon" />
            </div>
          </div>

          <div className="dashboard-card modern-card">
            <div className="card-content">
              <div>
                <h3>Completed Tests</h3>
                <div className="card-number">8</div>
              </div>
              <CheckCircle size={50} className="card-icon" />
            </div>
          </div>

          <div className="dashboard-card modern-card">
            <div className="card-content">
              <div>
                <h3>Schedule</h3>
                <div className="card-number">3</div>
              </div>
              <CalendarDays size={50} className="card-icon" />
            </div>
          </div>

        </div>

        {/* Upcoming Tests */}
        <div className="section">

          <h2 className="section-title">Upcoming Tests</h2>

          <div className="test-grid">

            {upcomingTests.map((test) => (
              <div className="test-card" key={test.id}>

                <h3>{test.name}</h3>
                <p>Course: {test.course}</p>
                <p>Date: {test.date}</p>
                <p>Duration: {test.duration}</p>

                <button
                  className="btn-primary"
                  onClick={() => navigate("/student/exam")}
                >
                  Start Test
                </button>

              </div>
            ))}

          </div>

        </div>

        {/* Quick Links */}

        <div className="section">

          <h2 className="section-title">Quick Links</h2>

          <div className="quick-links">

            <div className="quick-card">
              <h3>📚 Courses</h3>
              <p>View enrolled courses</p>
            </div>

            <div className="quick-card">
              <h3>🧠 Practice Questions</h3>
              <p>Access question bank</p>
            </div>

            <div className="quick-card">
              <h3>📊 Test History</h3>
              <p>View previous results</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;