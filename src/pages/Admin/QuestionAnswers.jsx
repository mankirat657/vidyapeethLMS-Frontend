import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import {
  BookOpen,
  ChevronRight,
  Trophy,
  Brain,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  FileQuestion,
  Award,
  Zap,
  Trash
} from 'lucide-react';
import { MdEdit } from "react-icons/md";
import QuestionAnswersModal from './QuestionAnswersModal';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionAnswerss } from '../../store/actions/QuestionAnswerAction';
import { toast } from 'react-toastify';
import "./question.css";
import AiModal from './Modals/AiModal';
import UpdateQuestionModal from './Modals/UpdateQuestionModal';
import DeleteQuestionAnswerModal from './Modals/DeleteQuestionAnswerModal';
import { IoSearchOutline } from 'react-icons/io5';
const QuestionAnswers = ({ subjectId, subjectName }) => {
  const [modalClicked, setModalClicked] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [handleEditClick, setHandleEditClick] = useState(false);
  const [contentId, setContentId] = useState('')
  const [questionTobeUpdated, setQuestionTobeUpdated] = useState(null);
  const [updateToClickId, setUpdateToClickId] = useState('');
  const [deleteToClickId, setDeleteToClickId] = useState('');
  const [deleteModalClick, setDeleteModalClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  let questionCounter = 0;
  const { questionAnswers, loading, error } = useSelector(
    (state) => state.questionAnswer
  );
  const subjectWeightage = questionAnswers?.questionAnswers?.[0]?.subjectWeightage + "%";

  const filteredQuestion = questionAnswers?.questionAnswers
  ?.map((group) => ({
    ...group,
    questions: group.questions.filter((q) =>
      q?.questionText?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }))
  .filter(group => group.questions.length > 0);


  console.log(filteredQuestion);

  const dispatch = useDispatch();

  useEffect(() => {
    const getQuestionAnswers = async () => {
      const res = await dispatch(getQuestionAnswerss(subjectId));
      if (res?.error) {
        toast.error(res?.error);
      }

    };
    getQuestionAnswers();
  }, [dispatch, subjectId]);


  const toggleQuestionExpand = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getWeightageColor = (weightage) => {
    if (weightage >= 80) return 'high';
    if (weightage >= 50) return 'medium';
    return 'low';
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'Long_Answers':
        return <MessageSquare size={16} />;
      case 'Short_Answers':
        return <FileQuestion size={16} />;
      default:
        return <Brain size={16} />;
    }
  };
  let questionsLength = Array.isArray(questionAnswers?.questionAnswers) && questionAnswers?.questionAnswers?.reduce((acc, curr) => {
    return acc + curr.questions.length;

  }, 0);


  const allQuestions = Array.isArray(questionAnswers?.questionAnswers)
    ? questionAnswers.questionAnswers.flatMap(group => group.questions)
    : [];

  const findQuestionToBeUpdated = allQuestions.find(q => q._id === updateToClickId);
  const findQuestionToBeDeleted = allQuestions.find(q => q._id === deleteToClickId);
  return (
    <div className="qa-container">
      <div className="qa-header">
        <div className="qa-header-content">
          <BookOpen className="qa-header-icon" />
          <div>
            <h2 className="qa-title">Question Bank</h2>
            <p className="qa-subtitle">{subjectName || 'Subject Questions'}</p>
          </div>
          {questionAnswers?.questionAnswers?.[0]?.subjectWeightage && (

            <div className="qa-weightage-badge">
              <Award size={18} />
              <span>Subject Weightage: {questionAnswers?.questionAnswers[0]?.subjectWeightage}</span>
            </div>
          )}
        </div>
        <div className="qa-stats">

          <div className="qa-stat-item">
            <FileQuestion className="stat-icon" />
            <span>{questionsLength} Questions</span>
          </div>
          <div className="qa-stat-item">
            <Trophy className="stat-icon" />
            <span>Total Weightage: {questionAnswers?.questionAnswers?.reduce((sum, qa) =>
              sum + (qa.questions?.reduce((s, q) => s + (q.weightage || 0), 0) || 0), 0
            )}%</span>
          </div>
          <div onClick={() => setAiModalOpen(true)} className="ai-button">
            <Sparkles className="ai-icon" size={18} />
            <span>Create with AI</span>
            <Zap className="ai-icon-right" size={14} />
          </div>
        </div>
        <div className="relative ">
          <IoSearchOutline size={20} className='absolute top-1/2 -translate-y-1/2 left-2' />
          <input name='search' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" placeholder='Search the questions' className='outline-none border border-gray-300 w-[22vw] h-[5vh] rounded-full' style={{ padding: "0 1.5vw" }} />
        </div>
      </div>

      <div className="qa-questions-list">
        {Array.isArray(filteredQuestion) && filteredQuestion.length > 0 ? (
          [...filteredQuestion].reverse().map((qa, index) => (

            <div key={qa._id} className="qa-question-group">

              {Array.isArray(qa.questions) &&
                [...qa.questions]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((q, qIndex) => (
                    <div
                      key={q._id}
                      className={`qa-question-card ${expandedQuestions[q._id] ? 'expanded' : ''}`}
                    >
                      <div
                        className="qa-question-header"
                        onClick={() => toggleQuestionExpand(q._id)}
                      >
                        <div className="qa-question-info">
                          <div className="qa-question-number">
                            <span className="number">{String(++questionCounter).padStart(2, '0')}</span>

                          </div>
                          <div className="qa-question-type">
                            {getQuestionTypeIcon(q.questionType)}
                            <span>{q.questionType?.replace('_', ' ')}</span>
                          </div>
                          {q.isAiGenerated && (
                            <div className="qa-ai-badge">
                              <Sparkles size={14} />
                              <span>AI Generated</span>
                            </div>
                          )}
                        </div>
                        <div className="qa-question-meta">
                          <div className={`qa-weightage ${getWeightageColor(q.weightage)}`}>
                            <Zap size={14} />
                            <span>{q.weightage}%</span>
                          </div>
                          <ChevronRight
                            size={20}
                            className={`qa-expand-icon ${expandedQuestions[q._id] ? 'rotated' : ''}`}
                          />
                          <MdEdit onClick={() => {
                            setHandleEditClick(true),
                              setUpdateToClickId(q._id),
                              setContentId(qa._id)
                          }} size={20} className='qa-expand-icon hover:text-green-500! transition-all ease-linear' />
                          <Trash onClick={() => {
                            setDeleteModalClicked(true),
                              setDeleteToClickId(q._id),
                              setContentId(qa._id)
                          }} size={20} className='qa-expand-icon hover:text-red-500! transition-all ease-linear' />
                        </div>
                      </div>

                      <div className="qa-question-content">
                        <div className="qa-question-text">
                          <Brain className="question-icon" />
                          <p>{q.questionText}</p>
                        </div>

                        {expandedQuestions[q._id] && (
                          <div className="qa-answers-section">
                            <div className="qa-answers-header">
                              <CheckCircle2 size={18} />
                              <h4>Answers</h4>
                            </div>
                            {Array.isArray(q.answers) && q.answers.length > 0 ? (
                              <div className="qa-answers-list">
                                {q.answers.map((answer, aIndex) => (
                                  <div key={answer._id} className="qa-answer-item">
                                    <div className="qa-answer-bullet">
                                      <span>{String.fromCharCode(65 + aIndex)}</span>
                                    </div>
                                    <div className="qa-answer-content">
                                      <p>{answer.answerText}</p>
                                      {answer.isAiGenerated && (
                                        <div className="qa-answer-ai-badge">
                                          <Sparkles size={12} />
                                          <span>AI Generated</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="qa-no-answers">
                                <AlertCircle size={20} />
                                <p>No answers available for this question</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          ))
        ) : (
          <div className="qa-empty-state">
            <BookOpen size={64} className='justify-self-center' />
            <h3>No Questions Available</h3>
            <p>Click the + button to add your first question</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setModalClicked(true)}
          className="qa-add-button"
        >
          <FaPlus size={24} color='white' />
        </div>

      </div>

      {modalClicked && (
        <QuestionAnswersModal
          id={subjectId}
          isOpen={modalClicked}
          onClose={() => setModalClicked(false)}
        />
      )}
      {aiModalOpen && <AiModal subjectId={subjectId} subjectWeightage={subjectWeightage} isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />}
      {handleEditClick && <UpdateQuestionModal subjectId={subjectId} id={contentId} question={findQuestionToBeUpdated} setHandleEditClick={() => setHandleEditClick(false)} />}
      {deleteModalClick && <DeleteQuestionAnswerModal ispdf={false} subjectId={subjectId} id={contentId} question={findQuestionToBeDeleted} setHandleDeleteClick={() => setDeleteModalClicked(false)} />}
    </div>
  );
};

export default QuestionAnswers;