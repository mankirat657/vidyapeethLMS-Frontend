import React from 'react';
import { 
  X, 
  AlertTriangle, 
  UserX, 
  Shield, 
  Ban,
  AlertCircle,
  User,
  Clock
} from 'lucide-react';
import './StuBlockModal.css';
import { useDispatch } from 'react-redux';
import { blockStudent, getStudent } from '../../../store/actions/StudentAction';
import { toast } from 'react-toastify';

const StuBlockModal = ({ stuId, setIsBlocked, studentName, onConfirm }) => {
  
  const handleClose = () => {
    setIsBlocked(false);
  };
  const dispatch = useDispatch();
  const handleBlock = async() => {
    const res = await dispatch(blockStudent(stuId));
    if(res?.error){
        toast.error(res?.error || "something went wrong");
    }
    toast.success(res?.message || "Student Blocked Successfully");
    await dispatch(getStudent());
    setIsBlocked(false);
  };

  return (
    <div className="blockuser-overlay" onClick={handleClose}>
      <div className="blockuser-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="blockuser-header">
          <div className="blockuser-icon-wrapper">
            <UserX size={28} />
          </div>
          <button className="blockuser-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="blockuser-body">
          <h2 className="blockuser-title">Block Student</h2>
          
          <div className="blockuser-warning-box">
            <AlertTriangle size={18} />
            <span>Warning: This action will restrict student access</span>
          </div>

          <p className="blockuser-message">
            Are you sure you want to block this student? Blocked students will not be able to:
          </p>

          <div className="blockuser-consequences">
            <div className="blockuser-consequence-item">
              <Ban size={16} />
              <span>Access courses and materials</span>
            </div>
            <div className="blockuser-consequence-item">
              <Shield size={16} />
              <span>Submit assignments or tests</span>
            </div>
            <div className="blockuser-consequence-item">
              <Clock size={16} />
              <span>Participate in ongoing activities</span>
            </div>
          </div>

          <div className="blockuser-student-info">
            <User size={14} />
            <span>Student ID: <strong>{stuId || 'Unknown'}</strong></span>
            {studentName && (
              <span className="blockuser-student-name">Name: <strong>{studentName}</strong></span>
            )}
          </div>

          <div className="blockuser-note">
            <AlertCircle size={14} />
            <span>This action can be reversed later by unblocking the student</span>
          </div>
        </div>

        {/* Footer */}
        <div className="blockuser-footer">
          <button className="blockuser-cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="blockuser-block-btn" onClick={handleBlock}>
            <Ban size={16} />
            Block Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default StuBlockModal;