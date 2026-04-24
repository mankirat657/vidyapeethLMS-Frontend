import { useState } from "react";
import ManageStudentRow from "./ManageStudentRow";
import StudentPanel from "./StudentPanel";

function ManageStudentTable({ students }) {

  console.log(students);
  
  return (
    <>
      <div className="students-table">

        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        <div className="table-body">
          {Array.isArray(students) && students.map((s) => (
            <ManageStudentRow
              key={s._id}
              stuId = {s._id}
              student={s}
              onDelete={() => alert("Handle delete in parent")}
            />
          ))} 
        </div>

      </div>

     
    </>
  );
}

export default ManageStudentTable;