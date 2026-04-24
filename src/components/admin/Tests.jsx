import TestCardAdmin from "./TestCardAdmin";

function Tests() {
  const ongoingTests = [
    {
      title: "Java Quiz",
      course: "Programming",
      date: "Live Now",
      duration: "30 mins",
    },
  ];

  const upcomingTests = [
    {
      title: "React Midterm",
      course: "Web Development",
      date: "12 April",
      duration: "60 mins",
    },
    {
      title: "DSA Weekly Test",
      course: "Data Structures",
      date: "20 March",
      duration: "45 mins",
    },
  ];
  return (<div className="admin-tests-section">

    {/* 🔥 Ongoing Tests */}
    <h2 className="admin-tests-heading">Ongoing Tests</h2>
    <div className="admin-tests-grid">
      {ongoingTests.map((test, index) => (
        <TestCardAdmin key={index} {...test} status="ongoing" />
      ))}
    </div>  {/* ⬇️ Upcoming Tests */}
    <h2 className="admin-tests-heading admin-tests-heading-secondary">
      Upcoming Tests
    </h2>
    <div className="admin-tests-grid">
      {upcomingTests.map((test, index) => (
        <TestCardAdmin key={index} {...test} status="upcoming" />
      ))}
    </div>

  </div>
  );
}
export default Tests;