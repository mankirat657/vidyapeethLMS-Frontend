import React, { useState } from 'react';
import {
    X,
    Edit3,
    Save,
    AlertCircle,
    FileText,
    Hash,
    Tag,
    Sparkles,
    CheckCircle2,
    Type,
    ListChecks,
    Brain
} from 'lucide-react';
import './UpdateQuestionModal.css';
import { useDispatch } from 'react-redux';
import { getQuestionAnswerss, questionAnswersUpdation } from '../../../store/actions/QuestionAnswerAction';
import { toast } from 'react-toastify';

const UpdateQuestionModal = ({subjectId,  id, question, setHandleEditClick, onUpdate }) => {

    const [formData, setFormData] = useState({
        updatedQuestion: question?.questionText || '',
        questionType: question?.questionType || 'Long_Answers',
        weightage: question?.weightage || 0,
        updatedAnswer: question?.answers || [{ answerText: '', isAiGenerated: false }]
    });

    const dispatch = useDispatch();
    const [isSaving, setIsSaving] = useState(false);

    const handleClose = () => {
        setHandleEditClick();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...formData.updatedAnswer];
        updatedAnswers[index] = { ...updatedAnswers[index], answerText: value };
        setFormData(prev => ({
            ...prev,
            updatedAnswer: updatedAnswers
        }));
    };

   

    const handleRemoveAnswer = (index) => {
        if (formData.updatedAnswer.length > 1) {
            const updatedAnswers = formData.updatedAnswer.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                updatedAnswer: updatedAnswers
            }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.updatedQuestion.trim()) {
            toast.warn('Please enter a question');
            return;
        }
        if (!formData.weightage || formData.weightage < 0 || formData.weightage > 100) {
            toast.warn('Please enter a valid weightage (0-100)');
            return;
        }
        if (formData.updatedAnswer.some(a => !a.answerText.trim())) {
            toast.warn('Please fill all answers');
            return;
        }

        setIsSaving(true);
        const res = await dispatch(
            questionAnswersUpdation(
                id,
                question._id,
                question?.answers?.[0]?._id,
                {
                    ...formData,
                    updatedAnswer: formData.updatedAnswer[0].answerText 
                }
            )
        );


        if (res?.error) {
            toast.error(res?.error);
            setIsSaving(false);
            return;
        }
        toast.success(res?.message || "Question updated successfully");
        await dispatch(getQuestionAnswerss(subjectId));
        setIsSaving(false);
        handleClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    return (
        <div className="update-modal-overlay" onClick={handleClose} onKeyPress={handleKeyPress}>
            <div className="update-modal-container" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="update-modal-header">
                    <div className="update-header-left">
                        <div className="update-header-icon">
                            <Edit3 size={24} />
                        </div>
                        <div>
                            <h2 className="update-modal-title">Update Question</h2>
                            <p className="update-modal-subtitle">Edit question details and answers</p>
                        </div>
                    </div>
                    <button className="update-close-btn" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="update-modal-body">
                    {question?.isAiGenerated && (
                        <div className="update-ai-badge">
                            <Sparkles size={14} />
                            <span>AI Generated Question</span>
                        </div>
                    )}

                    <div className="update-form-group">
                        <label className="update-form-label">
                            <FileText size={16} />
                            <span>Question Text</span>
                        </label>
                        <textarea
                            name="updatedQuestion"
                            className="update-form-textarea"
                            value={formData.updatedQuestion}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Enter your question here..."
                        />
                    </div>

                    <div className="update-form-row">
                        <div className="update-form-group half">
                            <label className="update-form-label">
                                <Type size={16} />
                                <span>Question Type</span>
                            </label>
                            <select
                                name="questionType"
                                className="update-form-select"
                                value={formData.questionType}
                                onChange={handleInputChange}
                            >
                                <option value="Long_Answers">Long Answers</option>
                                <option value="Short_Answers">Short Answers</option>
                                <option value="MCQ">Multiple Choice</option>
                                <option value="True_False">True/False</option>
                            </select>
                        </div>

                        <div className="update-form-group half">
                            <label className="update-form-label">
                                <Hash size={16} />
                                <span>Weightage (%)</span>
                            </label>
                            <input
                                type="number"
                                name="weightage"
                                className="update-form-input"
                                value={formData.weightage}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                placeholder="Enter weightage"
                            />
                        </div>
                    </div>

                    <div className="update-answers-section">
                        <div className="update-answers-header">
                            <div className="update-form-label">
                                <ListChecks size={16} />
                                <span>Answers</span>
                            </div>
                           
                        </div>

                        {formData.updatedAnswer.map((answer, index) => (
                            <div key={index} className="update-answer-item">
                                <div className="update-answer-badge">
                                    <span>{String.fromCharCode(65 + index)}</span>
                                </div>
                                <div className="update-answer-content">
                                    <textarea
                                        className="update-answer-textarea"
                                        value={answer.answerText}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        rows="2"
                                        placeholder={`Answer ${String.fromCharCode(65 + index)}...`}
                                    />
                                    {answer.isAiGenerated && (
                                        <div className="update-answer-ai-badge">
                                            <Sparkles size={12} />
                                            <span>AI Generated</span>
                                        </div>
                                    )}
                                </div>
                                {formData.updatedAnswer.length > 1 && (
                                    <button
                                        className="update-remove-answer-btn"
                                        onClick={() => handleRemoveAnswer(index)}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="update-info-box">
                        <AlertCircle size={16} />
                        <span>Changes will be saved to the question bank immediately</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="update-modal-footer">
                    <button className="update-cancel-btn" onClick={handleClose}>
                        Cancel
                    </button>
                    <button
                        className="update-save-btn"
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <div className="update-spinner"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateQuestionModal;