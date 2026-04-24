import React from 'react';
import { FiX, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import './deletemodal.css';
import { deleteSubject, getSubject } from '../../../store/actions/subjectAction';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const DeleteSubjectModal = ({ isOpen, onClose, subjectName, onConfirm, setIsMenuOpen, id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsMenuOpen(false);
    const res = await dispatch(deleteSubject(id));
    console.log(res);

    if (res?.error) {
      toast.error(res?.error);
      return;
    }
    await dispatch(getSubject());
    toast.success(res.message || "Subject deleted successfully");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="dsm-overlay" onClick={onClose}>
          <div className="dsm-container" onClick={(e) => e.stopPropagation()}>
            <div className="dsm-header">
              <div className="dsm-icon-wrapper">
                <FiAlertTriangle />
              </div>
              <button className="dsm-close-btn" onClick={onClose}>
                <FiX />
              </button>
            </div>

            <div className="dsm-body">
              <h2 className="dsm-title">Delete Subject</h2>
              <p className="dsm-message">
                Are you sure you want to delete <strong>"{subjectName}"</strong>?
              </p>
              <p className="dsm-warning-text">
                This action cannot be undone. All associated modules and lessons will be permanently removed.
              </p>
            </div>

            <div className="dsm-footer">
              <button onClick={onClose} className="dsm-btn dsm-btn-cancel">
                Cancel
              </button>
              <button onClick={handleDelete} className="dsm-btn dsm-btn-delete">
                <FiTrash2 />
                Delete Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteSubjectModal;