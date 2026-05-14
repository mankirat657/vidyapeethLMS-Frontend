import { Users, BookOpen, ClipboardList, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTest } from "../../store/actions/TestAction";
import { toast } from "react-toastify";
import { getStudent } from "../../store/actions/StudentAction";
import { getALlQuestionAnswers } from "../../store/actions/QuestionAnswerAction";

function Overview() {
  const {students} = useSelector((state) => state.student);
  const {tests} = useSelector((state) => state.test);
  console.log(tests);
  const[testlength,setTest] = useState(null);
  const[banklength,setBankLength] = useState(null);
  console.log(students);
  const totalStudents = students?.students?.length || 0;
  console.log(students?.students);
  const dispatch = useDispatch()  
  const blockedStudents = Array.isArray(students?.students) && students?.students.filter((item) => item?.isBlocked);
 
  useEffect(() =>{
    const func = async() => {
      const res = await dispatch(getAllTest());
      if(res?.error){
        toast.error(res?.error);
      }
      setTest(res.test.length)
      
    }
    const fnc = async() => {
      const res = await dispatch(getALlQuestionAnswers());
      if(res?.error){
        toast.error(res?.error);
      }
      setBankLength(res?.questionAnswers.length);
    }
    fnc();
    func();
    dispatch(getStudent())
  },[dispatch])

  return (
    <div className="card-grid">

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Total Students</h3>
            <div className="card-number">{totalStudents}</div>
          </div>
          <Users size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Blocked Students</h3>
            <div className="card-number">{blockedStudents.length > 0 ? blockedStudents.length : 0}</div>
          </div>
          <BookOpen size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Total Tests</h3>
            <div className="card-number">{testlength || 0}</div>
          </div>
          <ClipboardList size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

      <div className="dashboard-card modern-card">
        <div className="card-content">
          <div>
            <h3>Question Bank</h3>
            <div className="card-number">{banklength || 0}</div>
          </div>
          <Database size={40} className="card-icon" strokeWidth={2.5} />
        </div>
      </div>

    </div>
  );
}

export default Overview;