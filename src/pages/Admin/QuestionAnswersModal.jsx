import React, { useState } from 'react';
import { X, Plus, Trash2, Save, AlertCircle } from 'lucide-react';
import './QuestionAnswersModal.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createQuestionAnswers, getQuestionAnswerss } from '../../store/actions/QuestionAnswerAction';
const QuestionAnswersModal = ({id, isOpen, onClose, onSave, initialQuestions = [] }) => {

    const [questions, setQuestions] = useState(
        initialQuestions.length > 0
            ? initialQuestions
            : [{
                id: Date.now(),
                questionText: '',
                questionType: 'Long_Answers',
                weightage: 10,
                answers: [{ answerText: '' }]
            }]
    );
    
    const dispatch = useDispatch();

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: Date.now(),
                questionText: '',
                questionType: 'Long_Answers',
                weightage: 10,
                answers: [{ answerText: '' }]
            }
        ]);
    };

    console.log(questions);

    const removeQuestion = (id) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const handleSave = async() => {
      const res = await dispatch(createQuestionAnswers(id,{questions}))
      if(res?.error){
        toast.error(res?.error);
        return;
      }
      toast.success(res.message || "Content created Successfully")
      await dispatch(getQuestionAnswerss(id));
      onClose();
    };

    const totalWeightage = questions.reduce((sum, q) => sum + (q.weightage || 0), 0);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    
                    <h2 className="modal-title">Question & Answers Setup</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="questions-list">
                        {questions.map((question, index) => (
                            <div key={question.id} className="question-card">
                                <div className="question-header">
                                    <div className="question-number">Question {index + 1}</div>
                                    {questions.length > 1 && (
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeQuestion(question.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Question Text
                                        <span className="required">*</span>
                                    </label>
                                    <textarea
                                    className="form-input textarea"
                                        value={question.questionText}
                                        onChange={(e) =>
                                            updateQuestion(question.id, 'questionText', e.target.value)
                                        }
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Answer
                                        <span className="required">*</span>
                                    </label>
                                    <textarea
                                    className="form-input textarea"
                                        value={question.answers[0]?.answerText || ''}
                                        onChange={(e) => {
                                            const updatedAnswers = [...question.answers];
                                            updatedAnswers[0].answerText = e.target.value;

                                            updateQuestion(question.id, 'answers', updatedAnswers);
                                        }}
                                    />

                                </div>

                                <div className="form-row">
                                    <div className="form-group half">
                                        <label className="form-label">
                                            Weightage (%)
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={question.weightage}
                                            onChange={(e) => updateQuestion(question.id, 'weightage', parseInt(e.target.value) || 0)}
                                            min="0"
                                            max="100"
                                            step="5"
                                        />
                                    </div>
                                    <div className="form-group half">
                                        <div className="weightage-indicator">
                                            <div
                                                className="weightage-bar"
                                                style={{ width: `${Math.min(question.weightage, 100)}%` }}
                                            />
                                            <span className="weightage-text">{question.weightage}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="add-question-btn" onClick={addQuestion}>
                        <Plus size={18} />
                        Add Question
                    </button>

                    <div className="total-weightage">
                        <div className="total-label">Total Weightage:</div>
                        <div className={`total-value ${totalWeightage !== 100 ? 'warning' : 'success'}`}>
                            {totalWeightage}%
                        </div>
                        {totalWeightage !== 100 && (
                            <div className="warning-message">
                                <AlertCircle size={14} />
                                Total weightage should be 100%
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="btn-secondary" onClick={onClose}>
                        Cancel
                    </div>
                    <div
                        className="btn-primary"
                        onClick={handleSave}
                        disabled={totalWeightage !== 100}
                    >
                        <Save size={16} />
                        Save Questions
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswersModal;