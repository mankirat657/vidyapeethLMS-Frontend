import React from 'react';
import { 
  X, 
  AlertTriangle, 
  Trash2, 
  FileQuestion,
  AlertCircle,
  Shield,
  XCircle
} from 'lucide-react';
import './DeleteQuestionAnswerModal.css';
import { useDispatch } from 'react-redux';
import { deletePdf, deleteQuestionAnswerDeletion, getQuestionAnswerss } from '../../../store/actions/QuestionAnswerAction';
import { toast } from 'react-toastify';

const DeleteQuestionAnswerModal = ({ 
    ispdf,
  subjectId, 
  id, 
  question, 
  setHandleDeleteClick,
  onConfirm 
}) => {
   console.log(subjectId);
    console.log(question?._id);
    console.log(id);
    
    
  const handleClose = () => {
    setHandleDeleteClick();
  };
  const dispatch = useDispatch();
  
  const handleDelete = async() => {
   if(ispdf){
    const res = await dispatch(deletePdf(id));
    if(res?.error){
        toast.error(res?.error || "error occured whiel deleting the question answers");
        return;
    }
    toast.success(res?.message || "question deleted successfully");
    await dispatch(getQuestionAnswerss(subjectId))
    handleClose();
   }else{

       const res = await dispatch(deleteQuestionAnswerDeletion(id,question?._id));
       console.log(res);
       
       if(res?.error){
           toast.error(res?.error || "error occured while deleting the question Answers");
           return;
        }
        toast.success(res?.message || "question deleted successfully");
        await dispatch(getQuestionAnswerss(subjectId))
        handleClose();
    };
}

  return (
    <div className="delete-qa-overlay" onClick={handleClose}>
      <div className="delete-qa-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="delete-qa-header">
          <div className="delete-qa-icon-wrapper">
            <AlertTriangle size={28} />
          </div>
          <button className="delete-qa-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="delete-qa-body">
          <h2 className="delete-qa-title">Delete Question & Answer</h2>
          
          <div className="delete-qa-warning-box">
            <AlertCircle size={18} />
            <span>This action cannot be undone!</span>
          </div>

          <p className="delete-qa-message">
            Are you sure you want to permanently delete this question and its associated answer?
          </p>

          <div className="delete-qa-question-preview">
            <div className="delete-qa-preview-header">
              <FileQuestion size={16} />
              <span>Question to be deleted:</span>
            </div>
            <p className="delete-qa-question-text">
              {question?.questionText || 'Unknown Question'}
            </p>
          </div>

          <div className="delete-qa-warning-note">
            <Shield size={14} />
            <span>Deleting this will remove it permanently from the database</span>
          </div>
        </div>

        <div className="delete-qa-footer">
          <button className="delete-qa-cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="delete-qa-delete-btn" onClick={handleDelete}>
            <Trash2 size={16} />
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestionAnswerModal;