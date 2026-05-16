import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function TestInstructions() {

  const navigate = useNavigate();
  const location = useLocation();
  const test = location.state?.test;

  const [agreed, setAgreed] = useState(false);

  return (

    <div className="instructions-page">

      <div className="instructions-card">

        {/* Header */}

        <div className="instructions-header">

          <h1 className="instructions-title">
            {test?.name || "Test"} Instructions
          </h1>

          <div className="instructions-meta">

            <div>
              <span>Duration:</span>
              <strong> <strong> {test?.duration || "60 mins"}</strong></strong>
            </div>

            <div>
              <span>Total Questions:</span>
              <strong> 20</strong>
            </div>

            <div>
              <span>Maximum Marks:</span>
              <strong> 20</strong>
            </div>

          </div>

        </div>

        {/* Instructions */}

        <div className="instructions-section">

          <h2>Instructions</h2>

          <ul className="instructions-list">

            <li>
              The test contains multiple choice questions.
            </li>

            <li>
              Each question has only one correct answer.
            </li>

            <li>
              No negative marking for wrong answers.
            </li>

            <li>
              Once the test starts, timer cannot be paused.
            </li>

            <li>
              Do not refresh or close the browser during exam.
            </li>

            <li>
              Click submit before time ends.
            </li>

          </ul>

        </div>

        {/* Color Legend */}

        <div className="instructions-section">

          <h2>Question Palette Legend</h2>

          <div className="legend-grid">

            <div className="legend-item">
              <div className="legend-color current"></div>
              <span>Current Question</span>
            </div>

            <div className="legend-item">
              <div className="legend-color answered"></div>
              <span>Answered</span>
            </div>

            <div className="legend-item">
              <div className="legend-color review"></div>
              <span>Marked for Review</span>
            </div>

            <div className="legend-item">
              <div className="legend-color not-visited"></div>
              <span>Not Visited</span>
            </div>

          </div>

        </div>

        {/* Agreement */}

        <div className="agree-section">

          <label className="agree-checkbox">

            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />

            <span>
              I have read all instructions carefully and agree
              to follow the examination guidelines.
            </span>

          </label>

          <button
            className="agree-btn"
            disabled={!agreed}
            onClick={() => navigate("/student/exam")}
          >
            Agree & Continue
          </button>

        </div>

      </div>

    </div>

  );
}

export default TestInstructions;

// import { useNavigate } from "react-router-dom";

// function TestInstructions() {

//   const navigate = useNavigate();

//   return (

//     <div className="instructions-page">

//       <div className="instructions-card">

//         {/* Header */}

//         <div className="instructions-header">

//           <h1 className="instructions-title">
//             React Midterm Test
//           </h1>

//           <div className="instructions-meta">

//             <div>
//               <span>Duration:</span>
//               <strong> 60 Minutes</strong>
//             </div>

//             <div>
//               <span>Total Questions:</span>
//               <strong> 20</strong>
//             </div>

//             <div>
//               <span>Maximum Marks:</span>
//               <strong> 20</strong>
//             </div>

//           </div>

//         </div>

//         {/* Instructions */}

//         <div className="instructions-section">

//           <h2>Instructions</h2>

//           <ul className="instructions-list">

//             <li>
//               The test contains multiple choice questions.
//             </li>

//             <li>
//               Each question has only one correct answer.
//             </li>

//             <li>
//               No negative marking for wrong answers.
//             </li>

//             <li>
//               Once the test starts, timer cannot be paused.
//             </li>

//             <li>
//               Do not refresh or close the browser during exam.
//             </li>

//             <li>
//               Click submit before time ends.
//             </li>

//           </ul>

//         </div>

//         {/* Color Legend */}

//         <div className="instructions-section">

//           <h2>Question Palette Legend</h2>

//           <div className="legend-grid">

//             <div className="legend-item">
//               <div className="legend-color current"></div>
//               <span>Current Question</span>
//             </div>

//             <div className="legend-item">
//               <div className="legend-color answered"></div>
//               <span>Answered</span>
//             </div>

//             <div className="legend-item">
//               <div className="legend-color review"></div>
//               <span>Marked for Review</span>
//             </div>

//             <div className="legend-item">
//               <div className="legend-color not-visited"></div>
//               <span>Not Visited</span>
//             </div>

//           </div>

//         </div>

//         {/* Agreement */}

//         <div className="agree-section">

//           <p>
//             I have read all instructions carefully and agree
//             to follow the examination guidelines.
//           </p>

//           <button
//             className="agree-btn"
//             onClick={() => navigate("/student/exam")}
//           >
//             Agree & Continue
//           </button>

//         </div>

//       </div>

//     </div>

//   );
// }

// export default TestInstructions;