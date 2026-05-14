import React, { useEffect, useState } from 'react';
import StudentLayout from '../layouts/StudentLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTest } from '../store/actions/TestAction';
import { 
  FileText, 
  Clock, 
  Calendar, 
  Award,
  BookOpen,
  Layers,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  Users,
  Zap,
  Lock,
  PlayCircle
} from 'lucide-react';
import './StudentTest.css';
import { Link } from 'react-router-dom';

const StudentTest = () => {
  const dispatch = useDispatch();
  const { tests } = useSelector(state => state.test);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      setIsLoading(true);
      const res = await dispatch(getAllTest());
      console.log("Tests response:", res);
      setIsLoading(false);
    };
    fetchTests();
  }, [dispatch]);
  console.log(tests);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTotalMarks = (questions) => {
    if (!questions || !Array.isArray(questions)) return 0;
    return questions.reduce((total, q) => total + (q.totalMarks || 0), 0);
  };

  const getQuestionCount = (questions) => {
    if (!questions || !Array.isArray(questions)) return 0;
    return questions.length;
  };

  const getMCQCount = (questions) => {
    if (!questions || !Array.isArray(questions)) return 0;
    return questions.filter(q => q.questionType === 'Multiple_Choice').length;
  };

  const getLongAnswerCount = (questions) => {
    if (!questions || !Array.isArray(questions)) return 0;
    return questions.filter(q => q.questionType === 'Long_Answers').length;
  };

  // Helper function to check if test is finished (handles string "true"/"false")
  const isTestFinished = (test) => {
    return test?.isFinished === "true" || test?.isFinished === true;
  };

  return (
    <StudentLayout>
      <div className="stutest-container">
        {/* Header */}
        <div className="stutest-header">
          <div className="stutest-header-content">
            <div className="stutest-header-icon">
              <Trophy size={32} />
            </div>
            <div>
              <h1 className="stutest-title">Available Tests</h1>
              <p className="stutest-subtitle">Attempt and track your test progress</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stutest-stats">
          <div className="stutest-stat-card">
            <div className="stutest-stat-icon blue">
              <FileText size={24} />
            </div>
            <div className="stutest-stat-info">
              <h3>Total Tests</h3>
              <p>{tests?.test?.length || 0}</p>
            </div>
          </div>
          <div className="stutest-stat-card">
            <div className="stutest-stat-icon green">
              <PlayCircle size={24} />
            </div>
            <div className="stutest-stat-info">
              <h3>Available Tests</h3>
              <p>{tests?.test?.filter(t => t.isFinished !== "true").length || 0}</p>
            </div>
          </div>
          <div className="stutest-stat-card">
            <div className="stutest-stat-icon purple">
              <Zap size={24} />
            </div>
            <div className="stutest-stat-info">
              <h3>Avg Duration</h3>
              <p>{Math.round(tests?.test?.reduce((acc, t) => acc + (t.testDuration || 0), 0) / (tests?.test?.length || 1))} min</p>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="stutest-grid">
          {!isLoading && tests?.test?.length > 0 ? (
            tests.test.map((test, index) => {
              const isFinished = isTestFinished(test);
              return (
                <div key={test._id} className={`stutest-card ${isFinished ? 'finished' : ''}`}>
                  {/* Card Header */}
                  <div className="stutest-card-header">
                    <div className="stutest-card-icon">
                      <BookOpen size={28} />
                    </div>
                    <div className="stutest-card-badge">
                      {isFinished ? (
                        <>
                          <Lock size={12} />
                          Closed
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} />
                          Test {index + 1}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="stutest-card-body">
                    <h3 className="stutest-subject-name">
                      {test.subject?.name || 'Unknown Subject'}
                    </h3>
                    
                    <div className="stutest-subject-code">
                      <Award size={14} />
                      <span>Code: {test.subject?.subjectCode || 'N/A'}</span>
                    </div>

                    <div className="stutest-stats-row">
                      <div className="stutest-stat-item">
                        <Layers size={16} />
                        <span>{getQuestionCount(test.questions)} Questions</span>
                      </div>
                      <div className="stutest-stat-item">
                        <Award size={16} />
                        <span>{calculateTotalMarks(test.questions)} Marks</span>
                      </div>
                    </div>

                    <div className="stutest-meta-row">
                      <div className="stutest-meta-item">
                        <Clock size={14} />
                        <span>Duration: {test.testDuration || 60} min</span>
                      </div>
                      <div className="stutest-meta-item">
                        <Calendar size={14} />
                        <span>Created: {formatDate(test.createdAt)}</span>
                      </div>
                    </div>

                    <div className="stutest-question-stats">
                      <div className="stutest-question-type">
                        <span className="mcq-count">MCQ: {getMCQCount(test.questions)}</span>
                        <span className="long-count">Long Answer: {getLongAnswerCount(test.questions)}</span>
                      </div>
                    </div>

                    {isFinished && (
                      <div className="stutest-finished-badge">
                        <Lock size={14} />
                        <span>This test is closed</span>
                      </div>
                    )}
                  </div>

                  <div className="stutest-card-footer">
                    <Link to={!isFinished && "/student/tests/startTest"} state={test}>
                    <button
                      className={`stutest-start-btn ${isFinished ? 'disabled' : ''}`}
                      disabled={isFinished}
                     
                    >
                      {isFinished ? (
                        <>
                          <Lock size={18} />
                          Test Closed
                        </>
                      ) : (
                        <>
                          <PlayCircle size={18} />
                          Start Test
                          <ChevronRight size={18} />
                        </>
                      )}
                    </button>
                      </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="stutest-empty-state">
              <FileText size={64} />
              <h3>No Tests Available</h3>
              <p>Check back later for new tests</p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentTest;