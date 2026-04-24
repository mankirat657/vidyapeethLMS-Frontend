import { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";

function TestPage() {

  const questions = [
    {
      id: 1,
      type: "mcq",
      question: "What is React?",
      options: ["Library", "Framework", "Database", "Language"]
    },
    {
      id: 2,
      type: "truefalse",
      question: "React is a backend framework."
    },
    {
      id: 3,
      type: "short",
      question: "Explain Virtual DOM."
    },
    {
      id: 4,
      type: "long",
      question: "Explain React component lifecycle."
    }
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questions[current].id]: value
    });
  };

  const question = questions[current];

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const submitTest = () => {
    console.log("Submitted answers:", answers);
    alert("Test Submitted!");
  };

  return (
    <div className="layout">

      <StudentSidebar />

      <div className="main-content">

        <div className="test-header">
          <h2>React Midterm Test</h2>

          <div className="timer">
            {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>

        <div className="test-layout">

          {/* LEFT SIDE QUESTIONS */}

          <div className="test-container">

            <h3>
              Question {current + 1} / {questions.length}
            </h3>

            <p className="question-text">{question.question}</p>

            {question.type === "mcq" && (
              <div className="options">
                {question.options.map((opt, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="option"
                      onChange={() => handleAnswer(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {question.type === "truefalse" && (
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="tf"
                    onChange={() => handleAnswer("True")}
                  />
                  True
                </label>

                <label>
                  <input
                    type="radio"
                    name="tf"
                    onChange={() => handleAnswer("False")}
                  />
                  False
                </label>
              </div>
            )}

            {question.type === "short" && (
              <input
                className="short-answer"
                placeholder="Write your answer"
                onChange={(e) => handleAnswer(e.target.value)}
              />
            )}

            {question.type === "long" && (
              <textarea
                className="long-answer"
                placeholder="Write detailed answer"
                onChange={(e) => handleAnswer(e.target.value)}
              />
            )}

            <div className="test-nav">

              <button onClick={prevQuestion}>Previous</button>

              {current === questions.length - 1 ? (
                <button className="btn-primary" onClick={submitTest}>
                  Submit Test
                </button>
              ) : (
                <button className="btn-primary" onClick={nextQuestion}>
                  Next
                </button>
              )}

            </div>

          </div>

          {/* RIGHT SIDE NAVIGATOR */}

          <div className="question-panel">

            <h4>Questions</h4>

            <div className="question-grid">

              {questions.map((q, index) => {

                let status = "";

                if (index === current) status = "current";
                else if (answers[q.id]) status = "answered";

                return (
                  <div
                    key={q.id}
                    className={`q-number ${status}`}
                    onClick={() => setCurrent(index)}
                  >
                    {index + 1}
                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TestPage;