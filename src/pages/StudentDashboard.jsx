import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock3 } from "lucide-react";
import { useSelector } from "react-redux";
import StudentSidebar from "../components/StudentSidebar";

function StudentDashboard() {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const upcomingTests = [
  {
    id: 1,
    name: "React Midterm",
    course: "Web Development",
    date: "12 April",
    duration: "60 mins",
    difficulty: "Medium",
    status: "Starts in 2 Days",
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "Java Quiz",
    course: "Programming",
    date: "15 April",
    duration: "30 mins",
    difficulty: "Easy",
    status: "Starts Tomorrow",
    color: "#2563eb",
  },
  {
    id: 3,
    name: "DSA Assessment",
    course: "Data Structures",
    date: "18 April",
    duration: "90 mins",
    difficulty: "Hard",
    status: "Deadline Approaching",
    color: "#dc2626",
  },
];

  const analytics = [
    {
      id: 1,
      course: "Web Development",
      progress: 72,
      status: "Test Due",
      color: "#7c3aed",
    },
    {
      id: 2,
      course: "Java Programming",
      progress: 45,
      status: "On Track",
      color: "#2563eb",
    },
    {
      id: 3,
      course: "Data Structures",
      progress: 20,
      status: "Needs Attention",
      color: "#16a34a",
    },
  ];

  return (

    <div className="layout">

      <StudentSidebar />

      <div className="main-content">

        {/* Header */}
        <div className="mb-8">

          <h1 className="dashboard-header">
            Welcome, {user?.name || "Student"} 👋
          </h1>

          <p className="dashboard-subtitle">
            Track your learning progress and upcoming assessments
          </p>

        </div>

        {/* Analytics Section */}

        <div className="analytics-section">

          <div className="analytics-header">

            <div>

              <h2 className="analytics-title">
                Progress Dashboard
              </h2>

              <p className="analytics-subtitle">
                Course wise progress
              </p>

            </div>

          </div>

          <div className="analytics-container">

            {analytics.map((item) => (

              <div className="progress-item" key={item.id}>

                <div className="progress-top">

                  <div className="progress-course">
                    {item.course}
                  </div>

                  <div className="progress-percent">
                    {item.progress}%
                  </div>

                </div>

                <div className="progress-bar-bg">

                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: item.color
                    }}
                  ></div>

                </div>

                <div className="progress-status">
                  {item.status}
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Upcoming Tests */}

        {/* Upcoming Tests */}

<div className="section">

  <div className="section-header">

    <div>
      <h2 className="section-title">
        Upcoming Tests
      </h2>

      <p className="section-subtitle">
        Stay prepared for your scheduled assessments
      </p>
    </div>

  </div>

  <div className="modern-test-grid">

    {upcomingTests.map((test) => (

      <div
        className="modern-test-card"
        key={test.id}
        style={{
          borderTop: `4px solid ${test.color}`
        }}
      >

        <div className="test-card-top">

          <div>

            <h3 className="modern-test-title">
              {test.name}
            </h3>

            <p className="modern-test-course">
              {test.course}
            </p>

          </div>

          <div
            className="difficulty-badge"
            style={{
              backgroundColor: test.color
            }}
          >
            {test.difficulty}
          </div>

        </div>

        <div className="test-meta">

          <div className="meta-item">
            <CalendarDays size={16} />
            <span>{test.date}</span>
          </div>

          <div className="meta-item">
    <Clock3 size={16} />
    <span>{test.duration}</span>
  </div>
        </div>

        <div className="test-status">
          {test.status}
        </div>

        <button
          className="modern-test-btn"
          onClick={() =>
  navigate("/student/test-instructions", {
    state: { test }
  })
}
        >
          Start Test
        </button>

      </div>

    ))}

  </div>

</div>
        {/* Quick Links */}

        <div className="section">

          <h2 className="section-title">
            Quick Links
          </h2>

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