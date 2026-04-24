import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Performance = () => {

  /* ================= DATA ================= */

  const barData = [
    { test: "Test 1", score: 65 },
    { test: "Test 2", score: 72 },
    { test: "Test 3", score: 68 },
    { test: "Test 4", score: 75 },
    { test: "Test 5", score: 80 },
  ];

  const subjectData = [
    { subject: "Java", score: 72 },
    { subject: "DBMS", score: 65 },
    { subject: "Aptitude", score: 80 },
  ];

  const donutData = [
    { name: "0-20", value: 10 },
    { name: "20-40", value: 25 },
    { name: "40-60", value: 40 },
    { name: "60-80", value: 30 },
    { name: "80-100", value: 15 },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#8b5cf6"];

  /* ================= TOOLTIP ================= */

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-title">{label}</p>
          <p className="tooltip-score">Score: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };
    return (
    <div className="admin-performance-container">

      {/* ================= FILTERS ================= */}
      <div className="admin-performance-filters">

        <div className="admin-filter-group">
          <span className="admin-filter-icon">📘</span>
          <select className="admin-performance-dropdown">
            <option>Java Test</option>
            <option>Web Dev</option>
          </select>
        </div>

        <div className="admin-filter-group">
          <span className="admin-filter-icon">📅</span>
          <input type="date" className="admin-performance-date" />
        </div>

        <div className="admin-filter-group">
          <span className="admin-filter-icon">📊</span>
          <select className="admin-performance-dropdown">
            <option>Select Subject</option>
            <option>Java</option>
            <option>DBMS</option>
          </select>
        </div>

      </div>

      {/* ================= METRIC CARDS ================= */}
      <div className="admin-performance-cards">

  <div className="perf-card">
    <p className="admin-perf-label">Performance Change</p>

    <div className="metric-bar green">
      <span>+12%</span>
    </div>
  </div>

  <div className="perf-card">
    <p className="admin-perf-label">Pass Rate</p>
    <p className="admin-perf-value">78%</p>
  </div>

  <div className="perf-card">
    <p className="admin-perf-label">Low Performers</p>

    <div className="metric-bar red">
      <span>24</span>
    </div>
  </div>

  <div className="perf-card">
    <p className="admin-perf-label">Top 10% Avg</p>
    <p className="admin-perf-value">91%</p>
  </div>

  <div className="perf-card">
    <p className="admin-perf-label">Consistency</p>

    <div className="metric-bar purple">
      <span>Medium</span>
    </div>
  </div>

</div>

      {/* ================= MAIN SECTION ================= */}
      <div className="admin-performance-main">

        {/* LEFT CHART */}
        <div className="admin-performance-chart-card large">

          <div className="chart-header">
            <h2 className="admin-perf-heading">Test-wise Performance</h2>
            <p className="admin-perf-subtext">Average score across tests</p>
            <span className="chart-subtitle">Average score across tests</span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} barSize={35}>
              <XAxis dataKey="test" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="#4f7cff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* RIGHT INSIGHTS */}
        <div className="admin-performance-insights">

          <h3 className="admin-perf-section-title">Insights</h3>

          <div className="insight-card">
            <span>📈 Highest</span>
            <p>Test 5 - 80%</p>
          </div>

          <div className="insight-card">
            <span>📉 Lowest</span>
            <p>Test 1 - 65%</p>
          </div>

          <div className="insight-card">
            <span>📊 Trend</span>
            <p>Improving steadily</p>
          </div>

          <div className="insight-card">
            <span>⚠️ Note</span>
            <p>Test 3 dip observed</p>
          </div>

        </div>

      </div>

      {/* ================= LOWER SECTION ================= */}
      <div className="admin-performance-bottom">

        {/* SUBJECT */}
        <div className="chart-with-info">

          <div className="admin-performance-chart-card">
            <h3>Subject Performance</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData} barSize={30}>
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-info">
            <h4>Subject Insights</h4>
            <p>🟢 Strong: Aptitude (80%)</p>
            <p>🟡 Moderate: Java (72%)</p>
            <p>🔴 Weak: DBMS (65%)</p>
          </div>

        </div>

        {/* DISTRIBUTION */}
        <div className="chart-with-info">

          <div className="admin-performance-chart-card">
            <h3>Score Distribution</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-info">
            <h4>Score Ranges</h4>
            <p><span className="dot red"></span> 0-20 (Weak)</p>
            <p><span className="dot yellow"></span> 20-40</p>
            <p><span className="dot blue"></span> 40-60</p>
            <p><span className="dot green"></span> 60-80</p>
            <p><span className="dot purple"></span> 80-100 (Top)</p>
          </div>

        </div>

      </div>

      {/* ================= QUESTION ANALYSIS ================= */}
      <div className="admin-question-analysis">

        <h3>Question Analysis</h3>

        <div className="question-table">

          <div className="question-row header">
            <span>Question</span>
            <span>Accuracy</span>
            <span>Difficulty</span>
            <span>Time</span>
          </div>

          {[
            { q: "Q12", acc: "32%", diff: "Hard", time: "45s" },
            { q: "Q18", acc: "78%", diff: "Easy", time: "20s" },
            { q: "Q25", acc: "55%", diff: "Medium", time: "35s" },
          ].map((item, i) => (
            <div className="question-row" key={i}>
              <span>{item.q}</span>
              <span>{item.acc}</span>
              <span className={`tag ${item.diff.toLowerCase()}`}>
                {item.diff}
              </span>
              <span>{item.time}</span>
            </div>
          ))}

        </div>

      </div>
      </div> )}

export default Performance;