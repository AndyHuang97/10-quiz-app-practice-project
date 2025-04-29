import { useState, useCallback } from "react";

import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

const TIMEOUT = 10000;

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  // use as little state as possible, derive as much as possible
  //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // because after selecting the answer we do not go right away to next question
  const quisIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState(""); // go to next question
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  ); // no need to add state, because React will add it for you when using setState functions

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer] // uses state
  );

  if (quisIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // random returns a value in [0,1]
  // -0.5 makes the sort function return a value in [-0.5,0.5]
  // this means half of the pairs are swapped and half are kept in order
  shuffledAnswers.sort(() => Math.random() - 0.5);

  // to recreate/reset the QuestionTimer we need to change the key when the question changes!
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={TIMEOUT}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer; // add color only to selected answer
            let cssClass = ""

            if (answerState === "answered" && isSelected) {
              cssClass = "selected"
            }

            if ((answerState === "correct" || answerState === "correct") && isSelected) {
              cssClass = answerState
            }


            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
