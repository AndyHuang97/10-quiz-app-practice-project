import { useState } from "react";

import quizCompleteImg from "../assets/quiz-complete.png"
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  // use as little state as possible, derive as much as possible
  //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestionIndex = userAnswers.length;
  const quisIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  if (quisIsComplete) {
    return <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"/>
        <h2>Quiz Completed!</h2>
    </div>
  }
  
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // random returns a value in [0,1]
  // -0.5 makes the sort function return a value in [-0.5,0.5] 
  // this means half of the pairs are swapped and half are kept in order
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
