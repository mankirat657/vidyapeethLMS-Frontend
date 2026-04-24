import { useState, useEffect } from "react";

const questions = [
{
id:1,
type:"mcq",
question:"React is developed by?",
options:["Google","Facebook","Microsoft","Amazon"]
},
{
id:2,
type:"truefalse",
question:"JavaScript is strongly typed."
},
{
id:3,
type:"short",
question:"What is JSX?"
},
{
id:4,
type:"long",
question:"Explain Virtual DOM."
}
];

export default function ExamPage(){

const [current,setCurrent] = useState(0);
const [answers,setAnswers] = useState({});
const [review,setReview] = useState({});
const [timeLeft,setTimeLeft] = useState(900);

const q = questions[current];

useEffect(()=>{

const timer = setInterval(()=>{

setTimeLeft(t=>{

if(t <= 1){
clearInterval(timer);
alert("Time is over. Test submitted automatically.");
submitTest();
return 0;
}

return t - 1;

});

},1000);

return ()=>clearInterval(timer);

},[]);

useEffect(()=>{

const timer = setInterval(()=>{

setTimeLeft(t=>{

if(t <= 1){
clearInterval(timer);
alert("Time is over. Test submitted automatically.");
submitTest();
return 0;
}

return t - 1;

});

},1000);

return ()=>clearInterval(timer);

},[]);

function handleAnswer(value){

setAnswers(prev => ({
...prev,
[q.id]: value
}));

}

function clearResponse(){

setAnswers(prev => {
const updated = {...prev};
delete updated[q.id];
return updated;
});

}

function markReview(){

setReview(prev => ({
...prev,
[q.id]: !prev[q.id]
}));

}

function goNext(){

if(current < questions.length - 1){
setCurrent(current + 1);
}

}

function goPrev(){

if(current > 0){
setCurrent(current - 1);
}

}

function jump(index){
setCurrent(index);
}

function submitTest(){

const unanswered = questions.filter(q => !answers[q.id]).length;

const confirmSubmit = window.confirm(
`You still have ${unanswered} unanswered questions.
Are you sure you want to submit?`
);

if(confirmSubmit){
alert("Test Submitted Successfully");
}

}

function getStatus(id,index){

if(index === current) return "current";

if(review[id] && answers[id]) return "answered-review";

if(review[id]) return "review";

if(answers[id]) return "answered";

if(index < current) return "not-answered";

return "not-visited";

}

return(

<div className="exam-page full-exam">

{/* HEADER */}

<div className="exam-header">

<h2>Mock Test</h2>

<div className="timer">
{Math.floor(timeLeft/60)}:
{String(timeLeft%60).padStart(2,'0')}
</div>

</div>

{/* MAIN LAYOUT */}

<div className="exam-layout">

{/* QUESTION AREA */}

<div className="question-area">

<div className="question-content">

<h3>Question {current+1}</h3>

<p>{q.question}</p>

<div className="options">

{/* MCQ */}

{q.type === "mcq" && q.options.map(opt => (

<label key={opt}>

<input
type="radio"
checked={answers[q.id] === opt}
onChange={()=>handleAnswer(opt)}
/>

{opt}

</label>

))}

{/* TRUE FALSE */}

{q.type === "truefalse" && (

<>

<label>

<input
type="radio"
checked={answers[q.id] === "true"}
onChange={()=>handleAnswer("true")}
/>

True

</label>

<label>

<input
type="radio"
checked={answers[q.id] === "false"}
onChange={()=>handleAnswer("false")}
/>

False

</label>

</>

)}

{/* SHORT ANSWER */}

{q.type === "short" && (

<input
className="short-answer"
value={answers[q.id] || ""}
onChange={(e)=>handleAnswer(e.target.value)}
/>

)}

{/* LONG ANSWER */}

{q.type === "long" && (

<textarea
className="long-answer"
value={answers[q.id] || ""}
onChange={(e)=>handleAnswer(e.target.value)}
/>

)}

</div>

</div>

{/* ACTION BUTTONS */}

<div className="exam-actions">

<button onClick={goPrev}>Previous</button>

<button onClick={markReview}>
{review[q.id] ? "Unmark Review" : "Mark for Review"}
</button>

<button onClick={clearResponse}>
Clear Response
</button>

<button onClick={goNext}>
Next
</button>

<button className="submit-btn" onClick={submitTest}>
Submit Test
</button>

</div>

</div>

{/* QUESTION PALETTE */}

<div className="palette">

<h4>Questions</h4>

<div className="palette-grid">

{questions.map((q,index)=>(

<div
key={q.id}
className={`p-number ${getStatus(q.id,index)}`}
onClick={()=>jump(index)}
>

{index+1}

</div>

))}

</div>

{/* LEGEND */}

<div className="palette-legend">

<div className="legend-item">
<div className="legend-color legend-current"></div>
Current
</div>

<div className="legend-item">
<div className="legend-color legend-answered"></div>
Answered
</div>

<div className="legend-item">
<div className="legend-color legend-review"></div>
Review
</div>

<div className="legend-item">
<div className="legend-color legend-unvisited"></div>
Not Visited
</div>

</div>

</div>

</div>

</div>

);

}