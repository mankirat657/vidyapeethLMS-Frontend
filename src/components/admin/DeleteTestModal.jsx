import React from 'react';
import { 
  X, 
  AlertTriangle, 
  Trash2, 
  FileQuestion,
  AlertCircle,
  Shield,
  XCircle,
  Clock
} from 'lucide-react';
import './DeleteTestModal.css';
import { deleteTest, getAllTest } from '../../store/actions/TestAction';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const DeleteTestModal = ({ testId, setIsDeleteClicked, testName, onConfirm }) => {
  
  const handleClose = () => {
    setIsDeleteClicked(false);
  };
  const dispatch = useDispatch();
  const handleDelete = async() => {
    const res = await dispatch(deleteTest(testId));
    if(res?.error){
        toast.error(res?.error || "some error occured in the api");
    }
    toast.success(res?.message || "operation successfully completed")
    setIsDeleteClicked(false);
    await dispatch(getAllTest());
  };

  return (
    <div className="deletetest-overlay" onClick={handleClose}>
      <div className="deletetest-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="deletetest-header">
          <div className="deletetest-icon-wrapper">
            <AlertTriangle size={28} />
          </div>
          <button className="deletetest-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="deletetest-body">
          <h2 className="deletetest-title">Delete Test</h2>
          
          <div className="deletetest-warning-box">
            <AlertCircle size={18} />
            <span>This action cannot be undone!</span>
          </div>

          <p className="deletetest-message">
            Are you sure you want to permanently delete this test?
          </p>

          <div className="deletetest-test-preview">
            <div className="deletetest-preview-header">
              <FileQuestion size={16} />
              <span>Test to be deleted:</span>
            </div>
            <p className="deletetest-test-id">
              Test ID: <strong>{testId || 'Unknown'}</strong>
            </p>
            {testName && (
              <p className="deletetest-test-name">
                Name: <strong>{testName}</strong>
              </p>
            )}
          </div>

          <div className="deletetest-consequences">
            <div className="deletetest-consequence-item">
              <Trash2 size={16} />
              <span>All questions will be removed</span>
            </div>
            <div className="deletetest-consequence-item">
              <Clock size={16} />
              <span>Student responses will be lost</span>
            </div>
            <div className="deletetest-consequence-item">
              <Shield size={16} />
              <span>This action is permanent</span>
            </div>
          </div>

          <div className="deletetest-note">
            <XCircle size={14} />
            <span>Deleting this test will remove it from all student records</span>
          </div>
        </div>

        <div className="deletetest-footer">
          <button className="deletetest-cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="deletetest-delete-btn" onClick={handleDelete}>
            <Trash2 size={16} />
            Delete Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTestModal;