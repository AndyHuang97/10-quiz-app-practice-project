import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

const TIMEOUT = 10000;

export default function Question({
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSkipAnswer,
  onSelectAnswer
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={TIMEOUT} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        answerState={answerState}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
}
