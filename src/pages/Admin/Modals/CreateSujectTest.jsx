import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Plus, 
  Trash2, 
  Save,
  Sparkles,
  Zap,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Brain,
  Loader2,
  Eye,
  Edit3,
  Copy
} from 'lucide-react';
import './CreateSubjectTest.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AiTestModal from './AiTestModal';
import { createTest, getPrevTest } from '../../../store/actions/TestAction';

const CreateSubjectTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: subjectId, name: subjectName } = location.state || {};
  const dispatch = useDispatch();

  const [testDuration, setTestDuration] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/subject-test", { state: { id: subjectId, name: subjectName } });
    }
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText: '',
        questionType: 'Multiple_Choice',
        totalMarks: 5,
        answers: [
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false }
        ],
        isAiGenerated: false
      }
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        if (field === 'questionType') {
          if (value === 'Long_Answers') {
            return { 
              ...q, 
              [field]: value, 
              answers: [{ answerText: '', isCorrect: true }] 
            };
          } else {
            return { 
              ...q, 
              [field]: value, 
              answers: [
                { answerText: '', isCorrect: false },
                { answerText: '', isCorrect: false },
                { answerText: '', isCorrect: false },
                { answerText: '', isCorrect: false }
              ] 
            };
          }
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const updateAnswer = (questionId, answerIndex, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const updatedAnswers = [...q.answers];
        updatedAnswers[answerIndex] = { ...updatedAnswers[answerIndex], [field]: value };
        return { ...q, answers: updatedAnswers };
      }
      return q;
    }));
  };

  const addAnswer = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.questionType === 'Multiple_Choice') {
        return { ...q, answers: [...q.answers, { answerText: '', isCorrect: false }] };
      }
      return q;
    }));
  };

  const removeAnswer = (questionId, answerIndex) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.questionType === 'Multiple_Choice' && q.answers.length > 1) {
        const updatedAnswers = q.answers.filter((_, i) => i !== answerIndex);
        return { ...q, answers: updatedAnswers };
      }
      return q;
    }));
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleAiGenerated = (generatedQuestions) => {
    const newQuestions = generatedQuestions.map((q, index) => ({
      id: Date.now() + index,
      questionText: q.questionText,
      questionType: q.questionType || 'Long_Answers',
      totalMarks: q.totalMarks || 10,
      answers: q.answers || [{ answerText: q.answerText || '', isCorrect: true }],
      isAiGenerated: true
    }));
    setQuestions([...questions, ...newQuestions]);
  };

  const handleSubmit = async () => {
    if (!testDuration) {
      toast.warn('Please enter test duration');
      return;
    }
    if (questions.length === 0) {
      toast.warn('Please add at least one question');
      return;
    }

    for (const q of questions) {
      if (!q.questionText.trim()) {
        toast.warn('Please fill all question texts');
        return;
      }
      if (q.questionType === 'Multiple_Choice') {
        const hasCorrect = q.answers.some(a => a.isCorrect);
        if (!hasCorrect) {
          toast.warn(`Question ${questions.indexOf(q) + 1}: Each MCQ must have at least one correct answer`);
          return;
        }
        const allFilled = q.answers.every(a => a.answerText.trim());
        if (!allFilled) {
          toast.warn(`Question ${questions.indexOf(q) + 1}: Please fill all answer options`);
          return;
        }
      } else {
        if (!q.answers[0]?.answerText.trim()) {
          toast.warn(`Question ${questions.indexOf(q) + 1}: Please fill answer for long answer question`);
          return;
        }
      }
    }

    const formattedQuestions = questions.map(q => ({
      questionText: q.questionText,
      questionType: q.questionType,
      totalMarks: q.totalMarks,
      answers: q.answers.map(a => ({
        answerText: a.answerText,
        isCorrect: a.isCorrect
      })),
      isAiGenerated: q.isAiGenerated
    }));

    setIsSubmitting(true);
    const res = await dispatch(createTest(subjectId, {
      testQuestions: formattedQuestions,
      testDuration: parseInt(testDuration)
    }));

    if (res?.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }
    toast.success(res.message || 'Test created successfully');
    setIsSubmitting(false);
    await dispatch(getPrevTest(subjectId))
  };
  console.log(questions);
  
  return (
    <div className="subtest-container">
      <div className="subtest-header">
        <div className="subtest-header-left">
          <ArrowLeft className="subtest-back-icon" onClick={handleBack} />
          <div>
            <h1 className="subtest-title">Create Test</h1>
            <p className="subtest-subtitle">{subjectName || 'Subject'} - Create a new assessment</p>
          </div>
        </div>
        <div className="subtest-header-right">
          <button 
            className="subtest-ai-btn"
            onClick={() => setIsAiModalOpen(true)}
          >
            <Sparkles size={18} />
            Create with AI
          </button>
        </div>
      </div>

      <div className="subtest-duration-card">
        <div className="subtest-duration-left">
          <Clock size={20} />
          <div>
            <h3>Test Duration</h3>
            <p>Set the time limit for this test</p>
          </div>
        </div>
        <div className="subtest-duration-right">
          <input
            type="number"
            className="subtest-duration-input"
            value={testDuration}
            onChange={(e) => setTestDuration(e.target.value)}
            min="1"
            max="300"
          />
          <span className="subtest-duration-unit">minutes</span>
        </div>
      </div>

      <div className="subtest-questions-section">
        <div className="subtest-section-header">
          <h2>
            <FileText size={20} />
            Questions ({questions.length})
          </h2>
          <button className="subtest-add-question-btn" onClick={addNewQuestion}>
            <Plus size={18} />
            Add Question
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="subtest-empty-state flex flex-col items-center">
            <Brain size={64} />
            <h3>No Questions Added</h3>
            <p>Click "Add Question" or use AI to generate questions</p>
          </div>
        ) : (
          <div className="subtest-questions-list">
            {questions.map((question, index) => (
              <div key={question.id} className="subtest-question-card">
                <div className="subtest-question-header">
                  <div className="subtest-question-number">Q{index + 1}</div>
                  <div className="subtest-question-actions">
                    {question.isAiGenerated && (
                      <span className="subtest-ai-badge">
                        <Sparkles size={12} />
                        AI Generated
                      </span>
                    )}
                    <select
                      className="subtest-question-type-select"
                      value={question.questionType}
                      onChange={(e) => updateQuestion(question.id, 'questionType', e.target.value)}
                    >
                      <option value="Multiple_Choice">Multiple Choice</option>
                      <option value="Long_Answers">Long Answer</option>
                    </select>
                    <div className="subtest-marks-wrapper">
                      <span>Marks:</span>
                      <input
                        type="number"
                        className="subtest-marks-input"
                        value={question.totalMarks}
                        onChange={(e) => updateQuestion(question.id, 'totalMarks', parseInt(e.target.value) || 0)}
                        min="1"
                        max="100"
                      />
                    </div>
                    <button 
                      className="subtest-delete-btn"
                      onClick={() => deleteQuestion(question.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <textarea
                  className="subtest-question-input"
                  placeholder="Enter your question here..."
                  value={question.questionText}
                  onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                  rows="2"
                />

                {/* Answers Section - Conditional Rendering */}
                <div className="subtest-answers-section">
                  {question.questionType === 'Multiple_Choice' ? (
                    <>
                      <div className="subtest-answers-header">
                        <label>Answer Options</label>
                        <button 
                          className="subtest-add-answer-btn"
                          onClick={() => addAnswer(question.id)}
                        >
                          <Plus size={14} />
                          Add Option
                        </button>
                      </div>

                      <div className="subtest-answers-list">
                        {question.answers.map((answer, ansIndex) => (
                          <div key={ansIndex} className="subtest-answer-row">
                            <div className="subtest-answer-input-wrapper">
                              <input
                                type="text"
                                className="subtest-answer-input"
                                placeholder={`Option ${String.fromCharCode(65 + ansIndex)}`}
                                value={answer.answerText}
                                onChange={(e) => updateAnswer(question.id, ansIndex, 'answerText', e.target.value)}
                              />
                            </div>
                            <label className="subtest-correct-label">
                              <input
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={(e) => updateAnswer(question.id, ansIndex, 'isCorrect', e.target.checked)}
                              />
                              <CheckCircle size={14} />
                              Correct
                            </label>
                            {question.answers.length > 1 && (
                              <button 
                                className="subtest-remove-answer-btn"
                                onClick={() => removeAnswer(question.id, ansIndex)}
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="subtest-answers-header">
                        <label>Answer</label>
                      </div>
                      <div className="subtest-long-answer-container">
                        <textarea
                          className="subtest-long-answer-input"
                          placeholder="Enter the answer for this question..."
                          value={question.answers[0]?.answerText || ''}
                          onChange={(e) => updateAnswer(question.id, 0, 'answerText', e.target.value)}
                          rows="4"
                        />
                        <div className="subtest-long-answer-hint">
                          <AlertCircle size={12} />
                          <span>This is the correct answer for the long answer question</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="subtest-footer">
        <button className="subtest-cancel-btn" onClick={handleBack}>
          Cancel
        </button>
        <button 
          className="subtest-submit-btn" 
          onClick={handleSubmit}
          disabled={isSubmitting || questions.length === 0}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="subtest-spinner" />
              Creating Test...
            </>
          ) : (
            <>
              <Save size={18} />
              Create Test
            </>
          )}
        </button>
      </div>

      {/* AI Modal */}
      {isAiModalOpen && (
        <AiTestModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onGenerate={handleAiGenerated}
          subjectName={subjectName}
          subjectId ={subjectId}
          testDuration={testDuration}
        />
      )}
    </div>
  );
};

export default CreateSubjectTest;