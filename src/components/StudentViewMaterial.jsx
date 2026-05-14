import React, { useEffect, useState } from 'react';
import StudentLayout from '../layouts/StudentLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBankData } from '../store/actions/StudentBankDataActions';
import { 
  BookOpen, 
  Search, 
  FileText, 
  MessageSquare,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Eye,
  FileQuestion,
  Brain,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Database,
  Layers,
  ArrowLeft
} from 'lucide-react';
import './StudentViewMaterial.css';

const StudentViewMaterial = () => {
  const location = useLocation();
  const state = location.state;
  const dispatch = useDispatch();
  const { questionAnswers } = useSelector(state => state.studentBank);
  const [activeTab, setActiveTab] = useState('questions');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  console.log(state?._id);
  console.log(questionAnswers);
  const navigate = useNavigate()
  useEffect(() => {
    const getQuestionAnswers = async () => {
      const res = await dispatch(getBankData(state?._id));
      console.log(res);
    };
    getQuestionAnswers();
  }, [dispatch, state?._id]);

  useEffect(() => {
    if (questionAnswers?.knowledegeBankExist) {
      const filtered = questionAnswers.knowledegeBankExist.filter(qa =>
        qa.questions?.some(q =>
          q.questionText?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredQuestions(filtered);
    }
  }, [searchTerm, questionAnswers]);

  const toggleQuestionExpand = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const getWeightageClass = (weightage) => {
    if (weightage >= 80) return 'high';
    if (weightage >= 50) return 'medium';
    return 'low';
  };

  const calculateTotalQuestions = () => {
    if (!questionAnswers?.knowledegeBankExist) return 0;
    return questionAnswers.knowledegeBankExist.reduce(
      (total, qa) => total + (qa.questions?.length || 0),
      0
    );
  };

  const calculateTotalWeightage = () => {
    if (!questionAnswers?.knowledegeBankExist) return 0;
    return questionAnswers.knowledegeBankExist.reduce(
      (total, qa) => total + (qa.subjectWeightage ? parseInt(qa.subjectWeightage) : 0),
      0
    );
  };
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/student/knowledge-bank');
    }
  };
  const subjectName = questionAnswers?.knowledegeBankExist?.[0]?.subject?.name || 'Subject';
  const subjectWeightage = questionAnswers?.knowledegeBankExist?.[0]?.subjectWeightage || '0%';

  return (
    <StudentLayout>
      <div className="studentBank-container">
        <ArrowLeft style={{paddingBottom : "1rem"}} onClick={handleBack}  size={40} />
        {/* Subject Header */}
        <div className="studentBank-header">
          <div className="studentBank-header-content">
            <div className="subject-icon-wrapper">
              <BookOpen size={32} />
            </div>
            <div>
              <h1 className="studentBank-title">{subjectName}</h1>
              <p className="studentBank-subtitle">View and review learning materials</p>
            </div>
          </div>
          <div className="subject-weightage-card">
            <TrendingUp size={20} />
            <div>
              <p className="weightage-label">Subject Weightage</p>
              <p className="weightage-value">{subjectWeightage}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="studentBank-stats">
          <div className="studentBank-stat-card">
            <div className="studentBank-stat-icon purple">
              <FileQuestion size={24} />
            </div>
            <div className="studentBank-stat-info">
              <h3>Total Questions</h3>
              <p>{calculateTotalQuestions()}</p>
            </div>
          </div>
          <div className="studentBank-stat-card">
            <div className="studentBank-stat-icon orange">
              <Award size={24} />
            </div>
            <div className="studentBank-stat-info">
              <h3>Total Weightage</h3>
              <p>{calculateTotalWeightage()}%</p>
            </div>
          </div>
          <div className="studentBank-stat-card">
            <div className="stat-icon green">
              <Database size={24} />
            </div>
            <div className="studentBank-stat-info">
              <h3>Question Banks</h3>
              <p>{questionAnswers?.knowledegeBankExist?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="studentBank-tabs">
          <button
            className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            <MessageSquare size={18} />
            Question Answers
          </button>
          <button
            className={`tab-btn ${activeTab === 'pdfs' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdfs')}
          >
            <FileText size={18} />
            PDF Resources
          </button>
        </div>

        {/* Search Bar */}
        <div className="studentBank-search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="studentBank-search"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content Area */}
        <div className="studentBank-content">
          {activeTab === 'questions' ? (
            <>
              {filteredQuestions.length > 0 ? (
                <div className="questions-list">
                  {filteredQuestions.map((qa, index) => (
                    <div key={qa._id} className="question-bank-card">
                      <div className="card-header-info">
                        <div className="bank-header">
                          <div className="bank-icon">
                            <Database size={20} />
                          </div>
                          <div className="bank-info">
                            <h3>Question Bank {index + 1}</h3>
                            <span className="bank-weightage">
                              <Award size={14} />
                              Weightage: {qa.subjectWeightage || '0%'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="questions-container">
                        {qa.questions?.map((question, qIndex) => (
                          <div key={question._id} className="question-item">
                            <div 
                              className="question-header"
                              onClick={() => toggleQuestionExpand(question._id)}
                            >
                              <div className="question-left">
                                <div className="question-number">Q{qIndex + 1}</div>
                                <div className="question-type-badge">
                                  {question.questionType === 'Long_Answers' ? 'Long Answer' : 'MCQ'}
                                </div>
                               
                              </div>
                              <div className="question-right">
                                <div className={`weightage-badge ${getWeightageClass(question.weightage)}`}>
                                  <Award size={12} />
                                  {question.weightage} marks
                                </div>
                                {expandedQuestion === question._id ? (
                                  <ChevronUp size={18} />
                                ) : (
                                  <ChevronDown size={18} />
                                )}
                              </div>
                            </div>

                            <div className="question-text">
                              {question.questionText}
                            </div>

                            {expandedQuestion === question._id && (
                              <div className="answer-section">
                                <div className="answer-header">
                                  <CheckCircle size={16} />
                                  <span>Answer</span>
                                </div>
                                <div className="answer-content">
                                  {question.answers?.map((answer, aIndex) => (
                                    <div key={aIndex} className="answer-item">
                                      <div className="answer-text">{answer.answerText}</div>
                                      
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <FileQuestion size={64} />
                  <h3>No questions found</h3>
                  <p>Try searching with different keywords</p>
                </div>
              )}
            </>
          ) : (
            <div className="pdfs-container">
              {questionAnswers?.knowledegeBankExist?.filter(qa => qa.pdf && qa.pdf !== "" && qa.pdf !== null).length > 0 ? (
                <div className="pdfs-grid">
                  {questionAnswers.knowledegeBankExist.map((qa, index) => (
                    qa.pdf && qa.pdf !== "" && qa.pdf !== null && (
                      <div key={qa._id} className="pdf-card">
                        <div className="pdf-card-header">
                          <div className="pdf-icon-wrapper">
                            <FileText size={28} />
                          </div>
                          <div className="pdf-badge">PDF</div>
                        </div>
                        <div className="pdf-card-body">
                          <h3 className="pdf-title">Resource Document {index + 1}</h3>
                          <p className="pdf-description">
                            Supplementary learning material for {subjectName}
                          </p>
                          <div className="pdf-meta">
                            <Clock size={14} />
                            <span>Uploaded: {new Date(qa.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="pdf-card-footer">
                          <a 
                            href={qa.pdf} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="view-pdf-btn"
                          >
                            <Eye size={16} />
                            View PDF
                          </a>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <FileText size={64} />
                  <h3>No PDF resources available</h3>
                  <p>Check back later for study materials</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentViewMaterial;