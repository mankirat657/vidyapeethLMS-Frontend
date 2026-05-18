import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { useSelector } from "react-redux";
import StudentNavbar from "../components/StudentNavbar";
import {
  BrainCircuit,
  BarChart3,
  Github,
  Linkedin,
  Mail
} from "lucide-react";


function StudentDashboard() {

  const navigate = useNavigate();

  const analyticsRef = useRef(null);
  const testsRef = useRef(null);
  const knowledgeRef = useRef(null);

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [openAnalyticsModal, setOpenAnalyticsModal] =
    useState(false);

  const { user } = useSelector((state) => state.auth);

  /* ======================================================
     ACTIVE NAVBAR SCROLL TRACKING
  ====================================================== */

  useEffect(() => {

    const handleScroll = () => {

      const scrollPosition = window.scrollY + 180;

      if (
  knowledgeRef.current &&
  scrollPosition >= knowledgeRef.current.offsetTop
) {
  setActiveSection("knowledge");
}

else if (
  testsRef.current &&
  scrollPosition >= testsRef.current.offsetTop
) {
  setActiveSection("tests");
}

else if (
  analyticsRef.current &&
  scrollPosition >= analyticsRef.current.offsetTop
) {
  setActiveSection("dashboard");
}

else {
  setActiveSection("");
}
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  /* ======================================================
     ANALYTICS MODAL HANDLER
  ====================================================== */

  const handleSubjectClick = (subject) => {

    setSelectedSubject(subject);

    setOpenAnalyticsModal(true);
  };

  /* ======================================================
     UPCOMING TESTS
  ====================================================== */

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

  /* ======================================================
     SUBJECT ANALYTICS
  ====================================================== */

  const subjectAnalytics = [
    {
      id: 1,
      subject: "Web Development",
      marksScored: 340,
      totalMarks: 500,
      percentage: 68,
      testsAttempted: 8,
      color: "#7c3aed",

      previousTests: [
        {
          id: 101,
          testName: "React Midterm",
          score: 78,
          total: 100,
          attemptedOn: "12 April 2026",
        },
        {
          id: 102,
          testName: "JavaScript Quiz",
          score: 65,
          total: 100,
          attemptedOn: "18 April 2026",
        },
      ],
    },

    {
      id: 2,
      subject: "Java Programming",
      marksScored: 225,
      totalMarks: 500,
      percentage: 45,
      testsAttempted: 5,
      color: "#2563eb",

      previousTests: [
        {
          id: 201,
          testName: "Java Quiz 1",
          score: 45,
          total: 100,
          attemptedOn: "15 April 2026",
        },
      ],
    },

    {
      id: 3,
      subject: "Data Structures",
      marksScored: 100,
      totalMarks: 500,
      percentage: 20,
      testsAttempted: 3,
      color: "#16a34a",

      previousTests: [
        {
          id: 301,
          testName: "Arrays Assessment",
          score: 20,
          total: 100,
          attemptedOn: "20 April 2026",
        },
      ],
    },

    {
      id: 4,
      subject: "Software Testing",
      marksScored: 410,
      totalMarks: 500,
      percentage: 82,
      testsAttempted: 10,
      color: "#f59e0b",

      previousTests: [
        {
          id: 401,
          testName: "Automation Testing",
          score: 90,
          total: 100,
          attemptedOn: "22 April 2026",
        },
      ],
    },
  ];

  return (

    <div
  className={
    openAnalyticsModal
      ? "student-dashboard-page blur-background"
      : "student-dashboard-page"
  }
  style={{
    backgroundImage: "url('/sunset.jpg')"
  }}
>

      {/* NAVBAR */}

      <StudentNavbar
        analyticsRef={analyticsRef}
        testsRef={testsRef}
        knowledgeRef={knowledgeRef}
        activeSection={activeSection}
      />

      {/* MAIN CONTENT */}

      <div className="student-dashboard-content">

        {/* HERO SECTION */}

        <section className="hero-section">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="hero-left">

              <p className="hero-welcome">
                Welcome, {user?.name || "Dev Student"} 
              </p>

              <h1 className="hero-title">
                Accelerate Your
                <span> Tech Career.</span>
              </h1>

              <p className="hero-description">
                Master skills, crack assessments,
                and track your learning journey
                with an immersive CourseMate experience.
              </p>

              <div className="hero-buttons">

                <button className="hero-primary-btn">
                  Explore My Roadmap
                </button>

                <button className="hero-secondary-btn">
                  View Progress
                </button>

              </div>

            </div>

            <div className="hero-right">

              <img
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt="hero"
                className="hero-image"
              />

            </div>

          </div>

        </section>

                

        {/* ANALYTICS SECTION */}

        {/* ANALYTICS SECTION */}

<div
  className="analytics-section"
  ref={analyticsRef}
>

  <div className="section-header">

    <div>

      <h2 className="section-title">
        Progress Dashboard
      </h2>

      <p className="section-subtitle">
        Subject wise performance analytics
      </p>

    </div>

  </div>

  <div className="analytics-slider">

    {subjectAnalytics.map((item) => (

      <div
        className="analytics-card"
        key={item.id}
        onClick={() => handleSubjectClick(item)}
      >

        <div
          className="progress-circle"
          style={{
            background: `conic-gradient(
              ${item.color} ${item.percentage * 3.6}deg,
              #27272a 0deg
            )`
          }}
        >

          <div className="progress-circle-inner">

            <h2>
              {item.percentage}%
            </h2>

          </div>

        </div>

        <h3 className="analytics-subject">
          {item.subject}
        </h3>

        <p className="analytics-marks">
          {item.marksScored}/{item.totalMarks}
        </p>

        <span className="analytics-tests">
          {item.testsAttempted} Tests
        </span>

      </div>

    ))}

  </div>

</div>

        

        {/* UPCOMING TESTS */}

        <div
          className="section tests-section"
          ref={testsRef}
        >

          <div className="section-header">

            <div>

              <h2 className="section-title">
                Tests
              </h2>

              <p className="section-subtitle">
                Stay prepared with assessments
              </p>

            </div>

          </div>

          <div className="modern-test-grid">

            {upcomingTests.map((test) => (

              <div
                className="modern-test-card"
                key={test.id}
                style={{
                  borderTop:
                    `4px solid ${test.color}`
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
                    navigate(
                      "/student/test-instructions",
                      {
                        state: { test }
                      }
                    )
                  }
                >
                  Start Test
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* KNOWLEDGE BANK */}

        {/* KNOWLEDGE BANK */}

<div
  className="section knowledge-section"
  ref={knowledgeRef}
>

  <div className="section-header">

    <div>

      <h2 className="section-title">
        Knowledge Bank
      </h2>

      <p className="section-subtitle">
        Access learning resources
      </p>

    </div>

  </div>

  <div className="knowledge-grid modern-knowledge-grid">

    {/* PRACTICE QUESTIONS */}

    <div className="modern-knowledge-card practice-card">

      <div className="knowledge-card-top">

        <div>

          <h3>
            Practice Questions
          </h3>

          <p>
            Solve topic-wise MCQs,
            coding problems and
            improve consistency.
          </p>

        </div>

        <div className="knowledge-icon">
          <BrainCircuit size={42} />
        </div>

      </div>

      <button className="knowledge-btn">
        Open Practice Hub
      </button>

    </div>

    {/* TEST HISTORY */}

    <div className="modern-knowledge-card history-card">

      <div className="knowledge-card-top">

        <div>

          <h3>
            Test History
          </h3>

          <p>
            Review previous attempts,
            analytics and detailed
            performance reports.
          </p>

        </div>

        <div className="knowledge-icon">
          <BarChart3 size={42} />
        </div>

      </div>

      <button className="knowledge-btn">
        View Results
      </button>

    </div>

  </div>

</div>

        {/* FOOTER */}

        <footer className="student-footer">

  <div className="footer-top">

    <div className="footer-brand">

      <h2>
        CourseMate
      </h2>

      <p>
        Empowering students with modern
        assessments, analytics and
        immersive learning experiences.
      </p>

      <div className="footer-socials">

        <Github size={18} />

        <Linkedin size={18} />

        <Mail size={18} />

      </div>

    </div>

    <div className="footer-links">

      <div className="footer-column">

        <h3>
          Platform
        </h3>

        <a>Dashboard</a>

        <a>Tests</a>

        <a>Knowledge Bank</a>

      </div>

      <div className="footer-column">

        <h3>
          Resources
        </h3>

        <a>Practice</a>

        <a>Roadmaps</a>

        <a>Projects</a>

      </div>

    </div>

  </div>

  <div className="footer-bottom">

    <span>
      © 2026 CourseMate v1.0 Beta
    </span>

    <span>
      Built for modern learners 🚀
    </span>

  </div>

</footer>

      </div>

      {/* ANALYTICS MODAL */}

      {openAnalyticsModal &&
        selectedSubject && (

        <div className="analytics-modal-overlay">

          <div className="analytics-modal">

            <button
              className="close-modal-btn"
              onClick={() =>
                setOpenAnalyticsModal(false)
              }
            >
              ✕
            </button>

            <h2 className="modal-title">
              {selectedSubject.subject}
            </h2>

            <div className="modal-stats">

              <div className="modal-stat-card">

                <h3>
                  {selectedSubject.percentage}%
                </h3>

                <p>Overall Performance</p>

              </div>

              <div className="modal-stat-card">

                <h3>
                  {selectedSubject.marksScored}/
                  {selectedSubject.totalMarks}
                </h3>

                <p>Total Marks</p>

              </div>

              <div className="modal-stat-card">

                <h3>
                  {selectedSubject.testsAttempted}
                </h3>

                <p>Tests Attempted</p>

              </div>

            </div>

            <div className="previous-tests-section">

              <h3 className="previous-tests-title">
                Previous Tests
              </h3>

              <div className="previous-tests-list">

                {selectedSubject.previousTests.map(
                  (test) => (

                  <div
                    className="previous-test-card"
                    key={test.id}
                  >

                    <div>

                      <h4>{test.testName}</h4>

                      <p>
                        Attempted on
                        {" "}
                        {test.attemptedOn}
                      </p>

                    </div>

                    <div className="previous-test-right">

                      <span>
                        {test.score}/{test.total}
                      </span>

                      <button>
                        View Result
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default StudentDashboard;