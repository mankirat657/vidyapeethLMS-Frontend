const TestCardAdmin = ({ title, course, date, duration, status }) => {
  return (
    <div className="admin-test-card">
      <h3 className="admin-test-title">{title}</h3>

      <p className="admin-test-info">
        <span>Course:</span> {course}
      </p>
      <p className="admin-test-info">
        <span>Date:</span> {date}
      </p>
      <p className="admin-test-info">
        <span>Duration:</span> {duration}
      </p>

      {status === "ongoing" ? (
        <button className="admin-test-btn admin-test-btn-live">
          Live Now
        </button>
      ) : (
        <button className="admin-test-btn admin-test-btn-start">
          View Details
        </button>
      )}
    </div>
  );
};

export default TestCardAdmin;