import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTest } from "../../store/actions/TestAction";
import { toast } from "react-toastify";
import { getAllStudentResult } from "../../store/actions/resultAction";

const AdminResults = () => {
  const [adminSelectedTest, setAdminSelectedTest] = useState("");
  const [adminSelectedDate, setAdminSelectedDate] = useState("");
  const [clickedTestId, setClickedTestId] = useState(null);
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.test);
  const { adminResult } = useSelector((state) => state.result);


  useEffect(() => {
    if (!clickedTestId) return;

    const fetchResults = async () => {
      const res = await dispatch(getAllStudentResult(clickedTestId));

      if (res?.error) {
        toast.error(res.error || "Error occurred");
      } else {
        toast.success(res?.message || "Results fetched successfully");
      }
    };

    fetchResults();
  }, [clickedTestId, dispatch]);


  const filteredResults = adminResult?.test
    ? adminResult.test.filter((item) => {
      if (!adminSelectedDate) return true;

      const itemDate = new Date(item.createdAt || item.updatedAt)
        .toISOString()
        .split("T")[0];

      return itemDate === adminSelectedDate;
    })
    : [];

  const sortedResults = [...filteredResults].sort(
    (a, b) => (b.TotalScore || 0) - (a.TotalScore || 0)
  );
  const rankedResults = sortedResults.map((item, index, arr) => {
    let rank;

    if (index > 0 && item.TotalScore === arr[index - 1].TotalScore) {
      rank = arr[index - 1].rank;
    } else {
      rank = index + 1;
    }

    return {
      ...item,
      rank,
    };
  });
  const getAverageScore = sortedResults.length
    ? sortedResults.reduce((acc, curr) => acc + (curr?.TotalScore || 0), 0) / sortedResults.length
    : 0;

  const highestScore = sortedResults.length
    ? sortedResults[0]?.TotalScore || 0
    : 0;

  const lowestScore = sortedResults.length
    ? sortedResults[sortedResults.length - 1]?.TotalScore || 0
    : 0;

  const attemptedCount = sortedResults.length;

  const cheatedCount = sortedResults.filter(
    (result) => result.status === "cheated"
  ).length;
  const getTopPerformerColor = (index) => {
    const colors = ["gold", "silver", "bronze"];
    return colors[index] || "default";
  };

  const getRankIcon = (index) => {
    if (index === 0) return "🏆";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "📌";
  };

  const adminStats = adminSelectedTest && sortedResults.length > 0
    ? {
      students: sortedResults.length,
      avg: getAverageScore,
      highest: highestScore,
      lowest: lowestScore,
      time: "38m",
    }
    : null;

  return (
    <div className="admin-results-container">

      <div className="admin-results-filters">

        <div className="admin-filter-group">
          <span className="admin-filter-icon">📘</span>
          <select
            className="admin-results-dropdown"
            value={adminSelectedTest}
            onChange={(e) => {
              const selectedName = e.target.value;
              setAdminSelectedTest(selectedName);

              const selectedTest = tests?.test?.find(
                (t) => t.subject?.name === selectedName
              );

              setClickedTestId(selectedTest?._id || null);
            }}
          >
            <option value="">Select Test</option>
            {Array.isArray(tests?.test) && tests?.test.map((test) => (
              <option key={test._id} value={test?.subject?.name}>
                {test?.subject?.name}
              </option>
            ))}
          </select>
        </div>

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

      {adminStats && (
        <>
          <div className="admin-results-cards">

            <div className="admin-result-card">
              <div className="circle blue" style={{ "--value": attemptedCount }}>
                <span>{attemptedCount}</span>
              </div>
              <p>Attempted Test</p>
            </div>

            <div className="admin-result-card">
              <div className="circle light-blue" style={{ "--value": getAverageScore.toFixed(1) }}>
                <span>{getAverageScore.toFixed(1)}%</span>
              </div>
              <p>Average Score</p>
            </div>

            <div className="admin-result-card">
              <div className="circle green" style={{ "--value": highestScore }}>
                <span>{highestScore}</span>
              </div>
              <p>Highest Score</p>
            </div>

            <div className="admin-result-card">
              <div className="circle red" style={{ "--value": lowestScore }}>
                <span>{lowestScore}</span>
              </div>
              <p>Lowest Score</p>
            </div>

            <div className="admin-result-card">
              <div className="circle purple" style={{ "--value": cheatedCount }}>
                <span>{cheatedCount}</span>
              </div>
              <p>Cheated Count</p>
            </div>

          </div>

          <div className="admin-results-leaderboard-wrapper">

            <div className="admin-results-leaderboard">

              <div className="admin-results-table-header">
                <span>Rank</span>
                <span>Student</span>
                <span>Score</span>
                <span>Accuracy</span>
                <span>Attempted</span>
              </div>

              {rankedResults.map((user, index) => {
                const correct = user?.answers?.filter(a => a.isCorrect).length || 0;
                const accuracy = user?.totalAttempted
                  ? (correct / user.totalAttempted) * 100
                  : 0;
                const rank = index + 1;

                return (
                  <div className="admin-results-table-row" key={user._id}>
                    <span className="rank">#{user.rank}</span>
                    <span className="student">
                      <div className="avatar flex items-center gap-2">
                        {user?.student?.picture ? (
                          <img src={user.student.picture} alt="" />
                        ) : (
                          <span>{user?.student?.fullName?.firstName?.charAt(0) || 'U'}</span>
                        )}
                      </div>
                      {user?.student?.fullName?.firstName} {user?.student?.fullName?.lastName || ''}
                      {user?.status == "cheated" ? <div className="bg-red-600 text-white padd rounded-full">cheated</div> : ""}
                       {user?.status == "auto_submitted" ? <div className="bg-indigo-600 text-white padd rounded-full">late_submitted</div> : ""}
                    </span>
                    <span className="score">{user?.TotalScore}</span>
                    <span className="accuracy">{accuracy.toFixed(1)}%</span>
                    <span className="time">{user?.totalAttempted}</span>
                  </div>
                );
              })}
            </div>

            <div className="admin-results-top3">
              <h3>Top Performers</h3>

              {sortedResults.slice(0, 3).map((user, index) => {
                const medalColors = {
                  0: "green",
                  1: "orange",
                  2: "blue"
                };

                return (
                  <div className={`admin-top-card ${medalColors[index]}`} key={user._id}>
                    <div className="top-rank">{getRankIcon(index)}</div>
                    <div className="top-info">
                      <div className="top-avatar">
                        {user?.student?.picture ? (
                          <img src={user.student.picture} alt="" />
                        ) : (
                          user?.student?.fullName?.firstName?.charAt(0) || 'U'
                        )}
                      </div>
                      <div>
                        <p className="top-name">{user?.student?.fullName?.firstName}</p>
                        <span className="top-score">{user?.TotalScore}%</span>
                        {user?.status == "cheated" ? <div className="bg-red-600 text-white padd rounded-full">cheated</div> : ""}
                        {user?.status == "auto_submitted" ? <div className="bg-indigo-600 text-white padd rounded-full">late_submitted</div> : ""}
                      </div>
                    </div>
                    <span className="trend">
                      {index === 0 ? "↗" : index === 1 ? "↗" : "↗"}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </>
      )}

      {clickedTestId && sortedResults.length === 0 && (
        <div className="admin-results-empty">
          <p>No results found for this test</p>
        </div>
      )}

      {!clickedTestId && (
        <div className="admin-results-empty">
          <p>Select a test to view results</p>
        </div>
      )}
    </div>
  );
};

export default AdminResults;