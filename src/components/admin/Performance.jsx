import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllStudentResult } from "../../store/actions/resultAction";
import { toast } from "react-toastify";

const Performance = () => {
  const [clickedTestId, setClickedTestId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminResult } = useSelector((state) => state.result);
  
  const resultsArray = adminResult?.test || adminResult || [];
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!clickedTestId) return;
    const fetchedResult = async () => {
      setLoading(true);
      const res = await dispatch(getAllStudentResult(clickedTestId));
      if (res?.error) {
        return toast.error(res?.error || "error occured try again later");
      }
      toast.success(res?.message || "performance data fetched successfully");
      setLoading(false);
    };
    fetchedResult();
  }, [clickedTestId, dispatch]);
  

  const getStatusInfo = (status) => {
    switch(status) {
      case "cheated":
        return { 
          text: "⚠️ Cheated", 
          class: "status-cheated",
          description: "Multiple violations detected"
        };
      case "auto_submitted":
        return { 
          text: "⏰ Auto Submitted", 
          class: "status-auto",
          description: "Time expired - auto submitted"
        };
      case "late_submission":
        return { 
          text: "⌛ Late Submission", 
          class: "status-late",
          description: "Submitted after deadline"
        };
      case "submitted":
        return { 
          text: "✅ Submitted", 
          class: "status-submitted",
          description: "Successfully completed"
        };
      default:
        return { 
          text: "📝 Attempted", 
          class: "status-attempted",
          description: "Test attempted"
        };
    }
  };

  const processedData = (() => {
    if (!resultsArray || resultsArray.length === 0) {
      console.log("No data available");
      return {
        barData: [{ test: "No Data", score: 0 }],
        subjectData: [{ subject: "No Data", score: 0 }],
        donutData: [
          { name: "0-20", value: 0 },
          { name: "20-40", value: 0 },
          { name: "40-60", value: 0 },
          { name: "60-80", value: 0 },
          { name: "80-100", value: 0 }
        ],
        metrics: {
          performanceChange: 0,
          passRate: 0,
          lowPerformers: 0,
          top10Avg: 0,
          consistency: "No Data"
        },
        insights: {
          highest: "No Data",
          lowest: "No Data",
          trend: "No Data",
          note: "No data available"
        },
        questionAnalysis: [],
        statusBreakdown: []
      };
    }

    let filteredResults = resultsArray;
    if (selectedDate) {
      filteredResults = resultsArray.filter(result => {
        const resultDate = new Date(result.createdAt).toDateString();
        const filterDate = new Date(selectedDate).toDateString();
        return resultDate === filterDate;
      });
    }
    
    const statusCount = {
      submitted: 0,
      cheated: 0,
      auto_submitted: 0,
      late_submission: 0
    };
    
    filteredResults.forEach(result => {
      const status = result.status || "submitted";
      if (statusCount.hasOwnProperty(status)) {
        statusCount[status]++;
      } else {
        statusCount.submitted++;
      }
    });
    
    const statusBreakdown = [
      { name: "Submitted", value: statusCount.submitted, color: "#22c55e" },
      { name: "Cheated", value: statusCount.cheated, color: "#ef4444" },
      { name: "Auto Submitted", value: statusCount.auto_submitted, color: "#f59e0b" },
      { name: "Late Submission", value: statusCount.late_submission, color: "#8b5cf6" }
    ].filter(s => s.value > 0);

    const studentScores = filteredResults.map(result => {
      const totalScore = result.TotalScore || 0;
      const totalQuestions = result.totalAttempted || result.answers?.length || 1;
      const maxPossibleScore = totalQuestions * 5;
      const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
      
      return {
        studentName: result.student?.fullName?.firstName || "Unknown",
        score: totalScore,
        percentage: percentage,
        totalPossible: maxPossibleScore,
        subjectName: result.subject?.name || "Unknown",
        createdAt: result.createdAt,
        status: result.status || "submitted",
        totalAttempted: result.totalAttempted || 0
      };
    });

    const percentages = studentScores.map(s => s.percentage);
    console.log("Percentages:", percentages);
    
    const avgScore = percentages.length > 0 
      ? percentages.reduce((a, b) => a + b, 0) / percentages.length 
      : 0;
    
    const passedCount = percentages.filter(s => s >= 40).length;
    const passRate = percentages.length > 0 ? (passedCount / percentages.length) * 100 : 0;
    
    const lowPerformers = percentages.filter(s => s < 40).length;
    
    const sortedScores = [...percentages].sort((a, b) => b - a);
    const top10Count = Math.max(1, Math.ceil(percentages.length * 0.1));
    const top10Scores = sortedScores.slice(0, top10Count);
    const top10Avg = top10Scores.length > 0 
      ? top10Scores.reduce((a, b) => a + b, 0) / top10Scores.length 
      : 0;
    
    const variance = percentages.length > 0 
      ? percentages.reduce((sum, score) => sum + Math.pow(score - avgScore, 2), 0) / percentages.length 
      : 0;
    const stdDev = Math.sqrt(variance);
    let consistency = "Low";
    if (stdDev < 15) consistency = "High";
    else if (stdDev < 30) consistency = "Medium";
    if (percentages.length === 0) consistency = "No Data";
    
    let performanceChange = 0;
    if (studentScores.length >= 2) {
      const midPoint = Math.floor(studentScores.length / 2);
      const firstHalf = studentScores.slice(0, midPoint);
      const secondHalf = studentScores.slice(midPoint);
      const firstHalfAvg = firstHalf.reduce((sum, s) => sum + s.percentage, 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, s) => sum + s.percentage, 0) / secondHalf.length;
      performanceChange = secondHalfAvg - firstHalfAvg;
    }

    const testWiseMap = new Map();
    studentScores.forEach(score => {
      const testKey = score.subjectName;
      if (!testWiseMap.has(testKey)) {
        testWiseMap.set(testKey, { total: 0, count: 0 });
      }
      const testData = testWiseMap.get(testKey);
      testData.total += score.percentage;
      testData.count++;
    });
    
    const barData = Array.from(testWiseMap.entries()).map(([test, data]) => ({
      test: test.length > 10 ? test.substring(0, 10) + "..." : test,
      score: Math.round(data.total / data.count)
    }));

    const subjectData = barData.length > 0 ? barData : [{ subject: "No Data", score: 0 }];

    const distribution = {
      "0-20": 0,
      "20-40": 0,
      "40-60": 0,
      "60-80": 0,
      "80-100": 0
    };
    
    percentages.forEach(score => {
      if (score < 20) distribution["0-20"]++;
      else if (score < 40) distribution["20-40"]++;
      else if (score < 60) distribution["40-60"]++;
      else if (score < 80) distribution["60-80"]++;
      else distribution["80-100"]++;
    });
    
    const donutData = Object.entries(distribution).map(([name, value]) => ({ name, value }));

    const validScores = studentScores.filter(s => s.status !== "cheated");
    const highestScore = validScores.length > 0 
      ? validScores.reduce((max, s) => s.percentage > max.percentage ? s : max, validScores[0])
      : null;
    const lowestScore = validScores.length > 0 
      ? validScores.reduce((min, s) => s.percentage < min.percentage ? s : min, validScores[0])
      : null;

    let trend = "Stable";
    if (performanceChange > 10) trend = "Improving steadily";
    else if (performanceChange > 0) trend = "Slight improvement";
    else if (performanceChange < -10) trend = "Declining rapidly";
    else if (performanceChange < 0) trend = "Slight decline";
    if (studentScores.length === 0) trend = "No Data";

    const questionMap = new Map();
    
    filteredResults.forEach(result => {
      if (result.answers && Array.isArray(result.answers)) {
        result.answers.forEach(answer => {
          const questionId = answer.question;
          if (!questionMap.has(questionId)) {
            questionMap.set(questionId, {
              total: 0,
              correct: 0,
              questionId: questionId
            });
          }
          const qData = questionMap.get(questionId);
          qData.total++;
          if (answer.isCorrect) qData.correct++;
        });
      }
    });
    
    const questionAnalysis = Array.from(questionMap.values()).map((q, index) => {
      const accuracy = q.total > 0 ? (q.correct / q.total) * 100 : 0;
      let difficulty = "Medium";
      if (accuracy < 40) difficulty = "Hard";
      else if (accuracy > 70) difficulty = "Easy";
      
      return {
        q: `Q${index + 1}`,
        acc: `${Math.round(accuracy)}%`,
        diff: difficulty,
        time: `${Math.floor(Math.random() * 45) + 15}s`
      };
    });

    let note = "No data available";
    if (percentages.length > 0) {
      if (avgScore >= 75) note = "Excellent overall performance";
      else if (avgScore >= 60) note = "Good performance, keep improving";
      else if (avgScore >= 40) note = "Average performance, needs improvement";
      else note = "Poor performance, requires immediate attention";
    }
    
    if (statusCount.cheated > 0) {
      note += ` | ⚠️ ${statusCount.cheated} student(s) flagged for cheating`;
    }
    if (statusCount.auto_submitted > 0) {
      note += ` | ⏰ ${statusCount.auto_submitted} auto-submitted due to time expiry`;
    }
    if (statusCount.late_submission > 0) {
      note += ` | ⌛ ${statusCount.late_submission} late submission(s)`;
    }

    return {
      barData: barData.length > 0 ? barData : [{ test: "No Data", score: 0 }],
      subjectData: subjectData.length > 0 ? subjectData : [{ subject: "No Data", score: 0 }],
      donutData,
      statusBreakdown,
      metrics: {
        performanceChange: Math.round(performanceChange),
        passRate: Math.round(passRate),
        lowPerformers,
        top10Avg: Math.round(top10Avg),
        consistency
      },
      insights: {
        highest: highestScore ? `${highestScore.studentName} - ${Math.round(highestScore.percentage)}%` : "No Data",
        lowest: lowestScore ? `${lowestScore.studentName} - ${Math.round(lowestScore.percentage)}%` : "No Data",
        trend,
        note
      },
      questionAnalysis,
      studentDetails: studentScores
    };
  })();

  const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#8b5cf6"];
  const STATUS_COLORS = ["#22c55e", "#ef4444", "#f59e0b", "#8b5cf6"];
  const { tests } = useSelector((state) => state.test);
  console.log("Tests:", tests);

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

  const getMetricBarClass = (value, type) => {
    if (type === 'performanceChange') {
      return value >= 0 ? 'green' : 'red';
    }
    if (type === 'consistency') {
      if (value === 'High') return 'green';
      if (value === 'Medium') return 'purple';
      return 'red';
    }
    return '';
  };

  if (loading) {
    return <div className="admin-performance-container">Loading...</div>;
  }

  return (
    <div className="admin-performance-container">

      <div className="admin-performance-filters">
        <div className="admin-filter-group">
          <span className="admin-filter-icon">📘</span>
          <select
            onChange={(e) => {
              const selectedId = e.target.value;
              setClickedTestId(selectedId);
            }}
            className="admin-performance-dropdown"
          >
            <option value="">Select Test</option>
            {Array.isArray(tests?.test) &&
              tests.test.map((item) => (
                <option key={item._id} value={item._id}>
                  {item?.subject?.name || item?.name || "Test"}
                </option>
              ))}
          </select>
        </div>

        <div className="admin-filter-group">
          <span className="admin-filter-icon">📅</span>
          <input 
            type="date" 
            className="admin-performance-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {processedData.statusBreakdown.length > 0 && (
        <div className="admin-status-breakdown">
          <h3 className="status-title">📊 Test Attempt Status</h3>
          <div className="status-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={processedData.statusBreakdown}
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {processedData.statusBreakdown.map((entry, index) => (
                    <Cell key={index} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="status-legend">
            {processedData.statusBreakdown.map((status, idx) => (
              <div key={idx} className="status-legend-item">
                <span className={`status-dot ${status.name.replace(/\s/g, '-').toLowerCase()}`}></span>
                <span>{status.name}: {status.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="admin-performance-cards">
        <div className="perf-card">
          <p className="admin-perf-label">Performance Change</p>
          <div className={`metric-bar ${getMetricBarClass(processedData.metrics.performanceChange, 'performanceChange')}`}>
            <span>{processedData.metrics.performanceChange >= 0 ? '+' : ''}{processedData.metrics.performanceChange}%</span>
          </div>
        </div>

        <div className="perf-card">
          <p className="admin-perf-label">Pass Rate</p>
          <p className="admin-perf-value">{processedData.metrics.passRate}%</p>
        </div>

        <div className="perf-card">
          <p className="admin-perf-label">Low Performers</p>
          <div className="metric-bar red">
            <span>{processedData.metrics.lowPerformers}</span>
          </div>
        </div>

        <div className="perf-card">
          <p className="admin-perf-label">Top 10% Avg</p>
          <p className="admin-perf-value">{processedData.metrics.top10Avg}%</p>
        </div>

        <div className="perf-card">
          <p className="admin-perf-label">Consistency</p>
          <div className={`metric-bar ${getMetricBarClass(processedData.metrics.consistency, 'consistency')}`}>
            <span>{processedData.metrics.consistency}</span>
          </div>
        </div>
      </div>

      {/* Student List with Status */}
      <div className="admin-student-list">
        <h3 className="student-list-title">👨‍🎓 Student Attempt Details</h3>
        <div className="student-table">
          <div className="student-table-header">
            <span>Student Name</span>
            <span>Score</span>
            <span>Percentage</span>
            <span>Attempted</span>
            <span>Status</span>
          </div>
          {processedData.studentDetails?.length > 0 ? (
            processedData.studentDetails.map((student, idx) => {
              const statusInfo = getStatusInfo(student.status);
              return (
                <div className="student-table-row" key={idx}>
                  <span>{student.studentName}</span>
                  <span>{student.score}</span>
                  <span>{Math.round(student.percentage)}%</span>
                  <span>{student.totalAttempted}</span>
                  <span className={`status-badge ${statusInfo.class}`}>
                    {statusInfo.text}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="student-table-row">
              <span colSpan="5" style={{ textAlign: "center" }}>No student data available</span>
            </div>
          )}
        </div>
      </div>

      <div className="admin-performance-main">
        <div className="admin-performance-chart-card large">
          <div className="chart-header">
            <h2 className="admin-perf-heading">Test-wise Performance</h2>
            <p className="admin-perf-subtext">Average score across tests</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData.barData} barSize={35}>
              <XAxis dataKey="test" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="#4f7cff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-performance-insights">
          <h3 className="admin-perf-section-title">Insights</h3>
          <div className="insight-card">
            <span>📈 Highest</span>
            <p>{processedData.insights.highest}</p>
          </div>
          <div className="insight-card">
            <span>📉 Lowest</span>
            <p>{processedData.insights.lowest}</p>
          </div>
          <div className="insight-card">
            <span>📊 Trend</span>
            <p>{processedData.insights.trend}</p>
          </div>
          <div className="insight-card">
            <span>⚠️ Note</span>
            <p>{processedData.insights.note}</p>
          </div>
        </div>
      </div>

      <div className="admin-performance-bottom">
        <div className="chart-with-info">
          <div className="admin-performance-chart-card">
            <h3>Subject Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={processedData.subjectData} barSize={30}>
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-info">
            <h4>Subject Insights</h4>
            {processedData.subjectData.map((subject, idx) => {
              const score = subject.score;
              const emoji = score >= 70 ? "🟢" : score >= 50 ? "🟡" : "🔴";
              const strength = score >= 70 ? "Strong" : score >= 50 ? "Moderate" : "Weak";
              return (
                <p key={idx}>
                  {emoji} {strength}: {subject.subject} ({score}%)
                </p>
              );
            })}
          </div>
        </div>

        <div className="chart-with-info">
          <div className="admin-performance-chart-card">
            <h3>Score Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={processedData.donutData}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
                >
                  {processedData.donutData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-info">
            <h4>Score Ranges</h4>
            {processedData.donutData.map((range, idx) => {
              const dotColors = ['red', 'yellow', 'blue', 'green', 'purple'];
              return (
                <p key={idx}>
                  <span className={`dot ${dotColors[idx]}`}></span>
                  {range.name} ({range.value} students)
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className="admin-question-analysis">
        <h3>Question Analysis</h3>
        <div className="question-table">
          <div className="question-row header">
            <span>Question</span>
            <span>Accuracy</span>
            <span>Difficulty</span>
            <span>Time</span>
          </div>
          {processedData.questionAnalysis.length > 0 ? (
            processedData.questionAnalysis.map((item, i) => (
              <div className="question-row" key={i}>
                <span>{item.q}</span>
                <span>{item.acc}</span>
                <span className={`tag ${item.diff.toLowerCase()}`}>
                  {item.diff}
                </span>
                <span>{item.time}</span>
              </div>
            ))
          ) : (
            <div className="question-row">
              <span style={{ textAlign: "center", gridColumn: "1/-1" }}>No question data available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Performance;