import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Sparkles,
  Award,
  Lock,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  Trash
} from 'lucide-react';
import './PrevTestCard.css';
import { useDispatch } from 'react-redux';
import { publishTest } from '../../store/actions/TestAction';
import { toast } from 'react-toastify';
import DeleteTestModal from './DeleteTestModal';

const PrevTestCard = ({ tests }) => {
  const [expandedTestId, setExpandedTestId] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [isDeleteClick,setIsDeleteClicked] = useState(false);
  const[deleteTestId,setDeleteTestId] = useState(false);
  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleTestExpand = (testId) => {
    setExpandedTestId(expandedTestId === testId ? null : testId);
  };

  const toggleQuestionExpand = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getTotalMarks = (questions) => {
    return questions?.reduce((sum, q) => sum + (q.totalMarks || 0), 0) || 0;
  };

  const getQuestionTypeIcon = (type) => {
    if (type === 'Multiple_Choice') return <Zap size={14} />;
    return <BookOpen size={14} />;
  };

  const isAnswerCorrect = (answer, question) => {
    if (question.questionType === 'Multiple_Choice') {
      return answer.isCorrect === true;
    }
    return answer.isCorrect === true;
  };
  console.log(tests);
  
  const handlePublishTest = async(testId) => {
      const res = await dispatch(publishTest(testId));
      if(res?.error){
        toast.error(res?.error || "error occured");
      }
      toast.success(res?.message || "test Published successfully");
  }
  return (
    <div className="prevtest-container">
      {tests?.getTest?.map((test, index) => (
        <div key={test._id} className="prevtest-card">
          <div 
            className="prevtest-header"
            onClick={() => toggleTestExpand(test._id)}
          >
            <div className="prevtest-header-left">
              <div className="prevtest-icon-wrapper">
                <FileText size={24} />
              </div>
              <div className="prevtest-info">
                <h3 className="prevtest-title">
                  Test {index + 1}
                  {test.questions?.some(q => q.isAiGenerated) && (
                    <span className="prevtest-ai-badge">
                      <Sparkles size={12} />
                      AI Generated
                    </span>
                  )}
                </h3>
                <div className="prevtest-meta">
                  <span className="prevtest-meta-item">
                    <Clock size={14} />
                    {test.testDuration} mins
                  </span>
                  <span className="prevtest-meta-item">
                    <Calendar size={14} />
                    {formatDate(test.createdAt)}
                  </span>
                  <span className="prevtest-meta-item">
                    <FileText size={14} />
                    {test.questions?.length || 0} Questions
                  </span>
                  <span className="prevtest-meta-item">
                    <Award size={14} />
                    Total: {getTotalMarks(test.questions)} marks
                  </span>
                </div>
              </div>
            </div>
            {test?.isPublished == false ?  <div className="flex justify-end " onClick={() => handlePublishTest(test._id)}>
             <button>PublishTest</button>
            </div>: ""}
            <div onClick={() => {
              setIsDeleteClicked(true)
              setDeleteTestId(test._id)
            }} className="flex items-center gap-4">
              <Trash size={15} />
            </div>     
            <div className="prevtest-header-right">
              
              {expandedTestId === test._id ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
          </div>

          {expandedTestId === test._id && (
            <div className="prevtest-body">
              <div className="prevtest-questions-section">
                <h4 className="prevtest-section-title">
                  <Eye size={18} />
                  Questions & Answers
                </h4>
                
                {test.questions?.map((question, qIndex) => (
                  <div key={question._id} className="prevtest-question-item">
                    <div 
                      className="prevtest-question-header"
                      onClick={() => toggleQuestionExpand(question._id)}
                    >
                      <div className="prevtest-question-number">
                        Q{qIndex + 1}
                      </div>
                      <div className="prevtest-question-type">
                        {getQuestionTypeIcon(question.questionType)}
                        <span>
                          {question.questionType === 'Multiple_Choice' 
                            ? 'MCQ' 
                            : 'Long Answer'}
                        </span>
                      </div>
                      <div className="prevtest-question-marks">
                        <Award size={14} />
                        <span>{question.totalMarks} marks</span>
                      </div>
                      {question.isAiGenerated && (
                        <div className="prevtest-ai-tag">
                          <Sparkles size={12} />
                          AI
                        </div>
                      )}
                      <div className="prevtest-expand-icon">
                        {expandedQuestions[question._id] ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                    </div>

                    <div className="prevtest-question-text">
                      {question.questionText}
                    </div>

                    {expandedQuestions[question._id] && (
                      <div className="prevtest-answers-section">
                        <div className="prevtest-answers-title">
                          <CheckCircle size={16} />
                          <span>Answers</span>
                        </div>
                        <div className="prevtest-answers-list">
                          {question.answers?.map((answer, aIndex) => (
                            <div 
                              key={aIndex} 
                              className={`prevtest-answer-item ${
                                isAnswerCorrect(answer, question) ? 'correct' : ''
                              }`}
                            >
                              <div className="prevtest-answer-indicator">
                                {isAnswerCorrect(answer, question) ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  <XCircle size={16} />
                                )}
                              </div>
                              <div className="prevtest-answer-text">
                                {answer.answerText}
                              </div>
                              {isAnswerCorrect(answer, question) && (
                                <div className="prevtest-correct-badge">
                                  Correct Answer
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                   
                  </div>
                ))}
                 
              </div>

              
            </div>
          )}
        </div>
      ))}

      {(!tests || tests.length === 0) && (
        <div className="prevtest-empty">
          <FileText size={48} />
          <h3>No Previous Tests</h3>
          <p>Create your first test to see it here</p>
        </div>
      )}
      {isDeleteClick && <DeleteTestModal testId={deleteTestId}  setIsDeleteClicked={() => setIsDeleteClicked(false)} />}
    </div>
  );
};

export default PrevTestCard;