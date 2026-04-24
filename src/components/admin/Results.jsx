import { useState } from "react";

const AdminResults = () => {
  const [adminSelectedTest, setAdminSelectedTest] = useState("");
  const [adminSelectedDate, setAdminSelectedDate] = useState("");

  const adminTests = [
    "Java Test",
    "Web Development",
    "DBMS Mock",
    "Aptitude",
  ];

  const adminStats = adminSelectedTest
    ? {
        students: 120,
        avg: 68,
        highest: 95,
        lowest: 22,
        time: "38m",
      }
    : null;
return (
  <div className="admin-results-container">
      
      {/* 🔹 FILTERS */}
      <div className="admin-results-filters">

  {/* Test Dropdown */}
  <div className="admin-filter-group">
    <span className="admin-filter-icon">📘</span>
    <select
      className="admin-results-dropdown"
      value={adminSelectedTest}
      onChange={(e) => setAdminSelectedTest(e.target.value)}
    >
      <option value="">Select Test</option>
      {adminTests.map((test, index) => (
        <option key={index} value={test}>
          {test}
        </option>
      ))}
    </select>
  </div>

  {/* Date Picker */}
  <div className="admin-filter-group">
    <span className="admin-filter-icon">📅</span>
    <input
      type="date"
      className="admin-results-date"
      value={adminSelectedDate}
      onChange={(e) => setAdminSelectedDate(e.target.value)}
    />
  </div>

</div>

      {/* 🔹 OVERVIEW CARDS */}
      {/* 🔹 OVERVIEW CARDS */}
{adminStats && (
  <>
    {/* 🔹 OVERVIEW CARDS */}
    <div className="admin-results-cards">

  <div className="admin-result-card">
    <div className="circle blue" style={{ "--value": 60 }}>
      <span>120</span>
    </div>
    <p>Total Students</p>
  </div>

  <div className="admin-result-card">
    <div className="circle light-blue" style={{ "--value": 68 }}>
      <span>68%</span>
    </div>
    <p>Average Score</p>
  </div>

  <div className="admin-result-card">
    <div className="circle green" style={{ "--value": 95 }}>
      <span>95%</span>
    </div>
    <p>Highest Score</p>
  </div>

  <div className="admin-result-card">
    <div className="circle red" style={{ "--value": 22 }}>
      <span>22%</span>
    </div>
    <p>Lowest Score</p>
  </div>

  <div className="admin-result-card">
    <div className="circle purple" style={{ "--value": 75 }}>
      <span>38m</span>
    </div>
    <p>Avg Time</p>
  </div>

</div>
{/* 🔥 ADD LEADERBOARD HERE */}
    <div className="admin-results-leaderboard-wrapper">

      {/* LEFT TABLE */}
      <div className="admin-results-leaderboard">

        <div className="admin-results-table-header">
          <span>Rank</span>
          <span>Student</span>
          <span>Score</span>
          <span>Accuracy</span>
          <span>Time</span>
        </div>

        {[
          { name: "Priyanshu", score: 92, acc: 88, time: "32m" },
          { name: "Aman", score: 89, acc: 85, time: "35m" },
          { name: "Riya", score: 87, acc: 82, time: "36m" },
          { name: "Karan", score: 84, acc: 80, time: "38m" },
          { name: "Sneha", score: 81, acc: 78, time: "40m" },
        ].map((user, index) => (
          <div className="admin-results-table-row" key={index}>

            <span className="rank">#{index + 1}</span>

            <span className="student">
              <div className="avatar"></div>
              {user.name}
            </span>

            <span className="score">{user.score}%</span>

            <span className="accuracy">{user.acc}%</span>

            <span className="time">{user.time}</span>

          </div>
        ))}
      </div>

      {/* RIGHT TOP 3 */}
      <div className="admin-results-top3">

        <h3>Top Performers</h3>

        {[
          { name: "Priyanshu", score: 92, color: "blue" },
          { name: "Aman", score: 89, color: "green" },
          { name: "Riya", score: 87, color: "orange" },
        ].map((user, index) => (
          <div className={`admin-top-card ${user.color}`} key={index}>
            <div className="top-rank">{index + 1}</div>

            <div className="top-info">
              <div className="top-avatar">
               {user.name.charAt(0)}
              </div>
              <div>
                <p className="top-name">{user.name}</p>
                <span className="top-score">{user.score}%</span>
              </div>
            </div>

            <span className="trend">↗</span>
          </div>
        ))}

      </div>

    </div>
  </>
)}
    </div>

    
)}
export default AdminResults;