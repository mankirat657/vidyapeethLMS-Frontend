import { Trash2, ShieldOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import StuBlockModal from "./StuBlockModal";
import StuUnblockModal from "./StuUnblockModal";

function ManageStudentRow({stuId, student, onDelete, onOpen }) {

  const status = student?.isBlocked ? "blocked" : "active";
  const[isBlocked,setIsBlocked] = useState(false);
  const[isUnblocked,setIsUnblocked] = useState(false);
  const toggleBlock = (e) => {
    e.stopPropagation(); // prevents row click

  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevents row click

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (confirmDelete) {
      onDelete(student.id);
    }
  };
  console.log(student?.isBlocked);

  return (
    <div
      className="table-row"
      onClick={() => onOpen(student)}
    >

      {/* NAME */}
      <div className="student-name">
        <div className="avatar"><img
          src={student?.picture}
          alt="avatar"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${student?.fullName?.firstName}`;
          }}
        />
        </div>
        <div>
          <strong>{student?.fullName?.firstName}</strong>
        </div>
      </div>

      {/* EMAIL */}
      <span>{student.email}</span>



      {/* STATUS */}
      <span className={`status-badge ${status}`}>
        {status}
      </span>

      {/* ACTIONS */}
      <div
        className="actions"
        onClick={(e) => e.stopPropagation()} 
      >
        <button onClick={toggleBlock}>
          {!student?.isBlocked ? (
            <ShieldOff onClick={() => setIsBlocked(true)} className="icon block" />
          ) : (
            <ShieldCheck onClick={() => setIsUnblocked(true)} className="icon unblock" />
          )}
        </button>

        <button onClick={handleDelete}>
          <Trash2 className="icon delete" />
        </button>
      </div>
        {isBlocked && <StuBlockModal stuId={stuId} setIsBlocked={() => setIsBlocked(false)} />}  
        {isUnblocked && <StuUnblockModal stuId={stuId} setIsUnblocked={() => setIsUnblocked(false)} />}
    </div>
  );
}

export default ManageStudentRow;