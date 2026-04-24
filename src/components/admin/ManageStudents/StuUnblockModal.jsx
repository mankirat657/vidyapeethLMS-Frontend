import React from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Award,
  CheckCircle,
  AlertCircle,
  Unlock,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import './StuUnblockModal.css';
import { useDispatch } from 'react-redux';
import { getStudent, unblockStudent } from '../../../store/actions/StudentAction';
import { toast } from 'react-toastify';

const StuUnblockModal = ({ stuId, setIsUnblocked, studentName, onConfirm }) => {
  
  const handleClose = () => {
    setIsUnblocked(false);
  };
  const dispatch = useDispatch();
  const handleUnblock = async() => {
    const res = await dispatch(unblockStudent(stuId));
    if(res?.error){
        toast.error(res?.error);
    }
    toast.success(res?.message || "student unblocked successfully");
    await dispatch(getStudent())
    setIsUnblocked(false);
  };

  return (
    <div className="unblockuser-overlay" onClick={handleClose}>
      <div className="unblockuser-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="unblockuser-header">
          <div className="unblockuser-icon-wrapper">
            <ShieldCheck size={28} />
          </div>
          <button className="unblockuser-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="unblockuser-body">
          <h2 className="unblockuser-title">Unblock Student</h2>
          
          <div className="unblockuser-success-box">
            <CheckCircle size={18} />
            <span>Restore full access to this student</span>
          </div>

          <p className="unblockuser-message">
            Are you sure you want to unblock this student? Unblocking will restore:
          </p>

          <div className="unblockuser-benefits">
            <div className="unblockuser-benefit-item">
              <UserCheck size={16} />
              <span>Full platform access</span>
            </div>
            <div className="unblockuser-benefit-item">
              <Award size={16} />
              <span>Course enrollment privileges</span>
            </div>
            <div className="unblockuser-benefit-item">
              <Unlock size={16} />
              <span>Test and assessment access</span>
            </div>
          </div>

          <div className="unblockuser-student-info">
            <User size={14} />
            <span>Student ID: <strong>{stuId || 'Unknown'}</strong></span>
            {studentName && (
              <span className="unblockuser-student-name">Name: <strong>{studentName}</strong></span>
            )}
          </div>

          <div className="unblockuser-note">
            <Sparkles size={14} />
            <span>Student will be able to access all features immediately</span>
          </div>
        </div>

        {/* Footer */}
        <div className="unblockuser-footer">
          <button className="unblockuser-cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="unblockuser-unblock-btn" onClick={handleUnblock}>
            <Unlock size={16} />
            Unblock Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default StuUnblockModal;