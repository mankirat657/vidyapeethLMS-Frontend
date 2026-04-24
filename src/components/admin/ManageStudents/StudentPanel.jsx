import { X, BookOpen, ClipboardList, BarChart } from "lucide-react";

function StudentPanel({ student, onClose }) {
  if (!student) return null;

  // 🔥 SUBJECT DATA
  const subjects = [
    { name: "Java", tests: 12, avg: 92, color: "#2563eb" },
    { name: "DBMS", tests: 9, avg: 55, color: "#059669" },
    { name: "Aptitude", tests: 15, avg: 87, color: "#d97706" }
  ];

  // 🔥 TEST HISTORY
  const testHistory = [
    { subject: "Java", date: "12 Oct 2025", score: "90%" },
    { subject: "Java", date: "07 Sep 2025", score: "95%" },
    { subject: "Java", date: "04 Jun 2025", score: "92%" },
    { subject: "Java", date: "22 May 2025", score: "91%" },
    { subject: "Java", date: "11 Apr 2025", score: "93%" },

    { subject: "DBMS", date: "15 Oct 2025", score: "50%" },
    { subject: "DBMS", date: "10 Aug 2025", score: "60%" },
    { subject: "DBMS", date: "05 Jun 2025", score: "55%" },

    { subject: "Aptitude", date: "18 Oct 2025", score: "85%" },
    { subject: "Aptitude", date: "14 Sep 2025", score: "88%" },
    { subject: "Aptitude", date: "02 Jul 2025", score: "87%" },
    { subject: "Aptitude", date: "21 Jun 2025", score: "89%" }
  ];

  // 🔥 DOWNLOAD FUNCTION
  const downloadReport = () => {
    const report = {
      name: student.name,
      email: student.email,
      program: "MCA",
      subjects: subjects,
      history: testHistory
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${student.name}-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="student-panel-overlay">
      <div className="student-panel">

        {/* 🔷 HEADER */}
        <div className="panel-header">

          {/* LEFT (30%) */}
          <div className="profile-left">
            <div className="avatar-lg">{student.name[0]}</div>

            <div className="name-block">
              <h2>{student.name}</h2>
            </div>
          </div>

          {/* RIGHT (70%) */}
          <div className="profile-details">
            <div>
              <span>Program</span>
              <p>MCA</p>
            </div>

            <div>
              <span>Email</span>
              <p>{student.email}</p>
            </div>

            <div>
              <span>Enrollment</span>
              <p>12 Jan 2024</p>
            </div>
          </div>

          {/* 🔥 DOWNLOAD BUTTON */}
          <button className="download-btn" onClick={downloadReport}>
            Download
          </button>

          <button className="close-btn" onClick={onClose}>
            <X />
          </button>

        </div>

        {/* 🔷 BODY */}
        <div className="panel-body">

          {/* 🔥 SUBJECT CARDS */}
          <div className="subject-grid">
            {subjects.map((sub, index) => (
              <div key={index} className="subject-row">

                <div className="stat-card" style={{ background: sub.color }}>
                  <BookOpen size={24} />
                  <h3>{sub.name}</h3>
                </div>

                <div className="stat-card" style={{ background: sub.color }}>
                  <ClipboardList size={24} />
                  <h2>{sub.tests}</h2>
                  <p>Tests</p>
                </div>

                <div className="stat-card" style={{ background: sub.color }}>
                  <BarChart size={24} />
                  <h2>{sub.avg}%</h2>
                  <p>Avg Score</p>
                </div>

              </div>
            ))}
          </div>

          {/* 📊 TEST HISTORY */}
          <div className="test-history">

            <div className="history-header-top">
              <h3>📊 Test History</h3>
            </div>

            <div className="history-table">

              <div className="history-header">
                <span>Subject</span>
                <span>Date</span>
                <span>Score</span>
              </div>

              <div className="history-body">
                {testHistory.map((t, i) => (
                  <div key={i} className="history-row">
                    <span>{t.subject}</span>
                    <span>{t.date}</span>
                    <span className="score">{t.score}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentPanel;