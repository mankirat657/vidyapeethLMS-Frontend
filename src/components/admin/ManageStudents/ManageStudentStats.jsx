import { Users, UserCheck, UserX, UserPlus } from "lucide-react";

function ManageStudentStats({ students }) {
  const totalStudents = students?.students?.length || 0;
  console.log(totalStudents);
  const activeStudents = students?.students?.filter(
    (student) => !student.isBlocked
  ) || [];
  const blockedStudents = students?.students?.filter(
    (s) => s.isBlocked
  ) || [];

  const blockedCount = blockedStudents?.length;
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const newThisWeek = students?.students?.filter((student) => {
    const createdAt = new Date(student.createdAt);
    return createdAt >= startOfWeek && createdAt <= endOfWeek;
  }) || [];

  const newThisWeekCount = newThisWeek.length;

  return (
    <div className="students-stats">

      <div className="stat-card dark blue">
        <div className="stat-icon">
          <Users size={20} />
        </div>
        <h2>{totalStudents}</h2>
        <p>Total Students</p>
      </div>

      <div className="stat-card dark green">
        <div className="stat-icon">
          <UserCheck size={20} />
        </div>
        <h2>{activeStudents.length}</h2>
        <p>Active Students</p>
      </div>

      <div className="stat-card dark red">
        <div className="stat-icon">
          <UserX size={20} />
        </div>
        <h2>{blockedCount}</h2>
        <p>Blocked Students</p>
      </div>

      <div className="stat-card dark purple">
        <div className="stat-icon">
          <UserPlus size={20} />
        </div>
        <h2>{newThisWeekCount}</h2>
        <p>New This Week</p>
      </div>

    </div>
  );
}

export default ManageStudentStats;