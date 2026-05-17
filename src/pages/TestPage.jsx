import { useState, useEffect } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  Circle,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Flag,
  FileText,
  CheckSquare,
  Square
} from "lucide-react";
import "./TestPage.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validateTest } from "../store/actions/resultAction";
import { startTest } from "../store/actions/TestAction";
function TestPage() {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch()
    const questionss = data?.questions || [];

  const [violations, setViolations] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const enterFullScreen = async () => {
    try {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
      toast.error("Please allow fullscreen mode to start the test.");
    }
  };
  const submitAnswers = async () => {
    try {
      setIsSubmitted(true);

      const formattedAnswers =
        formatAnswersForSubmission();

      const result = await dispatch(
        validateTest(
          data._id,
          data.subject._id,
          formattedAnswers 
        )
      );

      if (result?.error) {
        setIsSubmitted(false);
        toast.error(result.error);
        return;
      }

      toast.success(
        `Test submitted successfully! Score: ${result.score}`
      );

      console.log("Result ID:", result.resultId);
    } catch (error) {
      setIsSubmitted(false);
      toast.error("Failed to submit test");
    }
  };
  const startExam = async () => {
    await enterFullScreen();
    const res = await dispatch(startTest(data?._id));
    if (res?.error) {
      toast.error(res?.error || "Error Occured");
    }
    setExamStarted(true);
    toast.success(res?.message || "exam started successfully");
  };

  useEffect(() => {
    if (!examStarted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations((prev) => prev + 1);
        toast.warn("Tab switching detected");
      }
    };

    const handleBlur = () => {
      setViolations((prev) => prev + 1);
      toast.info("Window lost focus!");
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setViolations((prev) => prev + 1);
        toast.warning("You exited fullscreen");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [examStarted]);

  useEffect(() => {
    if (violations >= 3) {
      toast.warning("Too many violations. Test submitted automatically");
      handleAutoSubmit();
    }
  }, [violations]);

  useEffect(() => {
    if (!examStarted || !data?.endTime) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(data.endTime).getTime();

      const remaining = Math.max(
        0,
        Math.floor((end - now) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining === 0 && !isSubmitted) {
        handleAutoSubmit();
      }
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [examStarted, data?.endTime, isSubmitted]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft < 300) return "critical";
    if (timeLeft < 600) return "warning";
    return "normal";
  };

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questionss[current]?._id]: value
    });
  };

  const handleMCQAnswer = (option) => {
    setAnswers({
      ...answers,
      [questionss[current]?._id]: option
    });
  };

  const question = questionss[current];
  const attemptedCount = Object.keys(answers).length;
  const progress = (attemptedCount / questionss.length) * 100;

  const nextQuestion = () => {
    if (current < questionss.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleAutoSubmit = async () => {
    if (isSubmitted) return;

    toast.info("Time's up! Submitting test...");
    await submitAnswers();
  };

  const submitTest = async () => {
    if (
      !window.confirm(
        "Are you sure you want to submit your test?"
      )
    ) {
      return;
    }

    await submitAnswers();
  };

  const getQuestionIcon = (type) => {
    switch (type) {
      case "Multiple_Choice": return <CheckSquare size={16} />;
      case "True_False": return <HelpCircle size={16} />;
      case "Short_Answer": return <FileText size={16} />;
      case "Long_Answer": return <BookOpen size={16} />;
      default: return <Circle size={16} />;
    }
  };

  const getQuestionTypeDisplay = (type) => {
    switch (type) {
      case "Multiple_Choice": return "Multiple Choice";
      case "True_False": return "True / False";
      case "Short_Answer": return "Short Answer";
      case "Long_Answer": return "Long Answer";
      default: return type;
    }
  };

  if (!examStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={startExam}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-blue-700"
        >
          Start Test in Full Screen
        </button>
      </div>
    );
  }

  if (!questionss || questionss.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold">No questions available</h2>
          <p className="text-gray-600">Please contact your instructor.</p>
        </div>
      </div>
    );
  }
  const formatAnswersForSubmission = () => {
    return Object.entries(answers).map(
      ([questionId, answerValue]) => {
        const question = questionss.find(
          (q) => q._id === questionId
        );

        if (!question) return null;

        if (
          question.questionType === "Multiple_Choice" ||
          question.questionType === "True_False"
        ) {
          const selectedOptionIndex =
            question.answers.findIndex(
              (option) =>
                option.answerText === answerValue
            );

          return {
            questionId,
            selectedOptionIndex,
          };
        }

        return {
          questionId,
          writtenAnswer: answerValue,
        };
      }
    ).filter(Boolean);
  };
  return (
    <div className="testpage-container">
      <div className="testpage-header">
        <div className="testpage-header-left">
          <div className="testpage-header-icon">
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="testpage-title">{data?.subject?.name || "Examination"}</h1>
            <p className="testpage-subtitle">{data?.subject?.description || "Test your knowledge"}</p>
          </div>
        </div>
        <div className={`testpage-timer ${getTimeColor()}`}>
          <Clock size={20} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="testpage-progress-section">
        <div className="testpage-progress-info">
          <span>Overall Progress</span>
          <span>{attemptedCount} / {questionss.length} Completed</span>
        </div>
        <div className="testpage-progress-bar">
          <div className="testpage-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="testpage-main">
        <div className="testpage-sidebar">
          <div className="testpage-sidebar-header">
            <h3>Question Navigator</h3>
            <span className="testpage-attempt-badge">
              <CheckCircle size={14} />
              {attemptedCount} Attempted
            </span>
          </div>

          <div className="testpage-question-grid">
            {questionss.map((q, index) => {
              let status = "unanswered";
              if (index === current) status = "current";
              else if (answers[q._id]) status = "answered";

              return (
                <button
                  key={q._id}
                  className={`testpage-q-btn ${status}`}
                  onClick={() => setCurrent(index)}
                >
                  <span className="q-number">{index + 1}</span>
                  {status === "answered" && <CheckCircle size={12} className="q-status-icon" />}
                  {status === "current" && <Flag size={12} className="q-status-icon" />}
                </button>
              );
            })}
          </div>

          <div className="testpage-stats">
            <div className="testpage-stat-item">
              <div className="stat-dot answered"></div>
              <span>Answered</span>
              <strong>{attemptedCount}</strong>
            </div>
            <div className="testpage-stat-item">
              <div className="stat-dot unanswered"></div>
              <span>Unanswered</span>
              <strong>{questionss.length - attemptedCount}</strong>
            </div>
            <div className="testpage-stat-item">
              <div className="stat-dot current"></div>
              <span>Current</span>
              <strong>1</strong>
            </div>
          </div>

          <button className="testpage-submit-btn" onClick={submitTest}>
            <Send size={18} />
            Submit Test
          </button>
        </div>

        <div className="testpage-question-area">
          <div className="testpage-question-card">
            <div className="testpage-question-header">
              <div className="testpage-question-badge">
                {getQuestionIcon(question.questionType)}
                <span>{getQuestionTypeDisplay(question.questionType)}</span>
              </div>
              <div className="testpage-question-marks">
                <Flag size={14} />
                <span>{question.totalMarks || 0} marks</span>
              </div>
            </div>

            <div className="testpage-question-text">
              <span className="testpage-q-symbol">Q{current + 1}.</span>
              <span>{question.questionText}</span>
            </div>

            {question.questionType === "Multiple_Choice" && question.answers && (
              <div className="testpage-options">
                {question.answers.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`testpage-option ${answers[question._id] === opt.answerText ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`mcq-${question._id}`}
                      value={opt.answerText}
                      checked={answers[question._id] === opt.answerText}
                      onChange={() => handleMCQAnswer(opt.answerText)}
                    />
                    <div className="testpage-option-content">
                      <span className="testpage-option-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="testpage-option-text">{opt.answerText}</span>
                      {answers[question._id] === opt.answerText && <CheckCircle size={16} className="check-icon" />}
                    </div>
                  </label>
                ))}
              </div>
            )}

            {question.questionType === "True_False" && (
              <div className="testpage-tf-options">
                <label className={`testpage-tf-option ${answers[question._id] === "True" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name={`tf-${question._id}`}
                    value="True"
                    checked={answers[question._id] === "True"}
                    onChange={() => handleAnswer("True")}
                  />
                  <div className="tf-content">
                    <span className="tf-badge true">T</span>
                    <span>True</span>
                  </div>
                </label>
                <label className={`testpage-tf-option ${answers[question._id] === "False" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name={`tf-${question._id}`}
                    value="False"
                    checked={answers[question._id] === "False"}
                    onChange={() => handleAnswer("False")}
                  />
                  <div className="tf-content">
                    <span className="tf-badge false">F</span>
                    <span>False</span>
                  </div>
                </label>
              </div>
            )}

            {(question.questionType === "Short_Answer" || question.questionType === "Long_Answer") && (
              <textarea
                className={question.questionType === "Short_Answer" ? "testpage-short-answer" : "testpage-long-answer"}
                placeholder={question.questionType === "Short_Answer" ? "Write your answer here..." : "Provide a detailed answer with examples..."}
                value={answers[question._id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                rows={question.questionType === "Short_Answer" ? 4 : 8}
              />
            )}

            <div className="testpage-nav">
              <button
                className="testpage-nav-prev"
                onClick={prevQuestion}
                disabled={current === 0}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="testpage-question-status">
                {answers[question._id] ? (
                  <><CheckCircle size={14} /> Answered</>
                ) : (
                  <><AlertCircle size={14} /> Not Answered</>
                )}
              </div>

              {current === questionss.length - 1 ? (
                <button className="testpage-submit" onClick={submitTest}>
                  Submit
                  <Send size={18} />
                </button>
              ) : (
                <button
                  className="testpage-nav-next"
                  onClick={nextQuestion}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;