import { useState, useCallback } from "react";

import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";

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

  // to recreate/reset the QuestionTimer we need to change the key when the question changes!
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // all the question should be reset!
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
