import { useDispatch, useSelector } from "react-redux";
import { finishQuiz, nextQuestion } from "../dataSlice";

export default function NextButton() {
  const {
    currentQuestionIndex,
    answerState,
    questions,
    loadingQuestions,
    questionsError,
    quizCompleted,
  } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const questionsLength = questions.length;
  const isLastQuestion = currentQuestionIndex === questionsLength - 1;
  const isButtonEnabled = answerState !== null;

  const handleButtonClick = () => {
    if (!isButtonEnabled) return;
    if (isLastQuestion) {
      dispatch(finishQuiz());
    } else {
      dispatch(nextQuestion());
    }
  };

  const commonButtonStyles = `
    px-3 py-1 border-3 rounded-full text-xl border-gray-500 cursor-pointer
    transition ease-in-out duration-150 transform
    active:scale-95
  `;

  const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

  const enabledStyles = `
    bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400
    hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101]
    active:from-[#520101] active:via-[#690101] active:to-[#970202]
  `;

  const disabledStyles = `
    bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 text-black
    cursor-not-allowed opacity-70
    hover:bg-gradient-to-b hover:from-stone-900 hover:via-stone-800 hover:to-stone-600
    active:scale-100
    active:bg-gradient-to-b active:from-stone-900 active:via-stone-800 active:to-stone-600
  `;

  if (quizCompleted || loadingQuestions || questionsError) {
    return null;
  }

  return (
    <button
      onClick={handleButtonClick}
      disabled={!isButtonEnabled}
      className={`rounded-full font-semibold transition duration-200
        ${commonButtonStyles}
        ${focusStyles}
        ${isButtonEnabled ? enabledStyles : disabledStyles}`}
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
}
