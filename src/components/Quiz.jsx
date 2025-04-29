import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  // use as little state as possible, derive as much as possible
  //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestionIndex = userAnswers.length;
  const quisIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  },
  []); // no need to add state, because React will add it for you when using setState functions

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer] // uses state
  );

  if (quisIsComplete) {
    console.log(userAnswers)
    return <Summary userAnswers={userAnswers}/>;
  }

  // to recreate/reset the QuestionTimer we need to change the key when the question changes!
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // all the question should be reset!
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
