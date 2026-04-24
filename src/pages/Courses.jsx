import StudentLayout from "../layouts/StudentLayout";

function Courses() {
  return (
    <StudentLayout>
      <h1>My Courses</h1>

      <div className="card-grid">
        <div className="card">Data Structures</div>
        <div className="card">Operating Systems</div>
        <div className="card">Database Management</div>
      </div>
    </StudentLayout>
  );
}

export default Courses;