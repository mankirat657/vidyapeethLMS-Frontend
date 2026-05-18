import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const questions = [
  {
    id: 1,
    type: "mcq",
    question: "React is developed by?",
    options: [
      "Google",
      "Facebook",
      "Microsoft",
      "Amazon"
    ]
  },

  {
    id: 2,
    type: "truefalse",
    question: "JavaScript is strongly typed."
  },

  {
    id: 3,
    type: "short",
    question: "What is JSX?"
  },

  {
    id: 4,
    type: "long",
    question: "Explain Virtual DOM."
  }
];

export default function ExamPage() {

  const [current, setCurrent] = useState(0);

  const [answers, setAnswers] = useState({});

  const [review, setReview] = useState({});

  const [timeLeft, setTimeLeft] = useState(900);

  const q = questions[current];
  const location = useLocation();

const test = location.state?.test;

  /* ======================================================
     TIMER
  ====================================================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((t) => {

        if (t <= 1) {

          clearInterval(timer);

          alert(
            "Time is over. Test submitted automatically."
          );

          submitTest();

          return 0;
        }

        return t - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* ======================================================
     ANSWERS
  ====================================================== */

  function handleAnswer(value) {

    setAnswers((prev) => ({
      ...prev,
      [q.id]: value
    }));
  }

 function clearResponse() {

  setAnswers((prev) => {

    const updated = { ...prev };

    delete updated[q.id];

    return updated;
  });

  // Remove review automatically

  setReview((prev) => {

    const updated = { ...prev };

    delete updated[q.id];

    return updated;
  });
}

  function markReview() {

  // Cannot mark review without answer

  if(!answers[q.id]){

    alert(
      "Please answer the question before marking for review."
    );

    return;
  }

  setReview((prev) => ({
    ...prev,
    [q.id]: !prev[q.id]
  }));
}

  function goNext() {

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  function goPrev() {

    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  function jump(index) {
    setCurrent(index);
  }

  function submitTest() {

    const unanswered = questions.filter(
      (q) => !answers[q.id]
    ).length;

    const confirmSubmit = window.confirm(
      `You still have ${unanswered} unanswered questions.
Are you sure you want to submit?`
    );

    if (confirmSubmit) {
      alert("Test Submitted Successfully");
    }
  }

  /* ======================================================
     QUESTION STATUS
  ====================================================== */

  function getStatus(id, index) {

  if(index === current){
    return "current";
  }

  if(review[id]){
    return "review";
  }

  if(answers[id]){
    return "answered";
  }

  if(index < current){
    return "not-answered";
  }

  return "not-visited";
}

  /* ======================================================
     TIMER FORMAT
  ====================================================== */

  const minutes = Math.floor(timeLeft / 60);

  const seconds = String(
    timeLeft % 60
  ).padStart(2, "0");

  const timerDanger = timeLeft <= 300;

  return (

    <div className="exam-page">

      {/* HEADER */}

      <div className="exam-header">

        <div>

          

          <h1>
           <h1>
  {test?.name || "Mock Test"}
</h1>
          </h1>

        </div>

        <div
          className={
            timerDanger
              ? "timer danger-timer"
              : "timer"
          }
        >

          {minutes}:{seconds}

        </div>

      </div>

      {/* MAIN LAYOUT */}

      <div className="exam-layout">

        {/* QUESTION AREA */}

        <div className="question-area">

          <div className="question-content">

            <div className="question-top">

              <p className="simple-question-number">
                  Question {current + 1}
              </p>

              <span className="question-type">
                {q.type.toUpperCase()}
              </span>

            </div>

            <h2 className="question-text">
              {q.question}
            </h2>

            {/* OPTIONS */}

            <div className="options-container">

              {/* MCQ */}

              {q.type === "mcq" &&
                q.options.map((opt) => (

                <div
                  key={opt}
                  className={
                    answers[q.id] === opt
                      ? "option-card selected-option"
                      : "option-card"
                  }
                  onClick={() =>
                    handleAnswer(opt)
                  }
                >

                  <div className="option-radio"></div>

                  {opt}

                </div>

              ))}

              {/* TRUE FALSE */}

              {q.type === "truefalse" && (

                <>

                  <div
                    className={
                      answers[q.id] === "true"
                        ? "option-card selected-option"
                        : "option-card"
                    }
                    onClick={() =>
                      handleAnswer("true")
                    }
                  >

                    <div className="option-radio"></div>

                    True

                  </div>

                  <div
                    className={
                      answers[q.id] === "false"
                        ? "option-card selected-option"
                        : "option-card"
                    }
                    onClick={() =>
                      handleAnswer("false")
                    }
                  >

                    <div className="option-radio"></div>

                    False

                  </div>

                </>

              )}

              {/* SHORT */}

              {q.type === "short" && (

                <input
                  className="modern-input"
                  placeholder="Type your answer..."
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    handleAnswer(
                      e.target.value
                    )
                  }
                />

              )}

              {/* LONG */}

              {q.type === "long" && (

                <textarea
                  className="modern-textarea"
                  placeholder="Write your answer..."
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    handleAnswer(
                      e.target.value
                    )
                  }
                />

              )}

            </div>

          </div>

          {/* ACTIONS */}

          <div className="exam-actions">

            <button
              className="exam-btn secondary-btn"
              onClick={goPrev}
            >
              Previous
            </button>

            <button
              className="exam-btn warning-btn"
              onClick={markReview}
            >
              {review[q.id]
                ? "Unmark Review"
                : "Mark for Review"}
            </button>

            <button
              className="exam-btn secondary-btn"
              onClick={clearResponse}
            >
              Clear Response
            </button>

            <button
              className="exam-btn primary-btn"
              onClick={goNext}
            >
              Next
            </button>

            <button
              className="exam-btn submit-btn"
              onClick={submitTest}
            >
              Submit Test
            </button>

          </div>

        </div>

        {/* QUESTION PALETTE */}

        <div className="palette">

          <h3>
            Question Palette
          </h3>

          <div className="palette-grid">

            {questions.map((q, index) => (

              <div
                key={q.id}
                className={`p-number ${getStatus(
                  q.id,
                  index
                )}`}
                onClick={() => jump(index)}
              >

                {index + 1}

              </div>

            ))}

          </div>

          {/* LEGEND */}

          <div className="palette-legend">

            <div className="legend-pill">
              <span className="legend-dot current-dot"></span>
              Current
            </div>

            <div className="legend-pill">
              <span className="legend-dot answered-dot"></span>
              Answered
            </div>

            <div className="legend-pill">
              <span className="legend-dot review-dot"></span>
              Review
            </div>

            <div className="legend-pill">
              <span className="legend-dot unvisited-dot"></span>
              Unvisited
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}