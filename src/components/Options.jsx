import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../dataSlice";

export default function Options({ options }) {
  const dispatch = useDispatch();
  const { answerState, questions, currentQuestionIndex, userAnswers } = useSelector(
    (state) => state.data
  );

  const handleClick = (opt) => {
    if (answerState === null) {
      dispatch(answerQuestion(opt));
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion?.correct_answer;
  const lastAnswer = userAnswers[userAnswers.length - 1];
  const disabled = answerState !== null;

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isPicked = lastAnswer === opt;
        const isCorrectOption = opt === correctAnswer;

        let bgClass =
          "bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 text-yellow-400 hover:bg-stone-700";
        if (disabled) {
          if (isCorrectOption) {

            bgClass =
              "bg-gradient-to-b from-green-900 via-green-700 to-green-900 text-yellow-400";
          } else if (isPicked && answerState === "incorrect") {
            bgClass =
              "bg-gradient-to-t from-[#5a0303] via-[#830606] to-[#5a0303] text-yellow-400";
          }
        }

        return (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            disabled={disabled}
            className={`
              border-3 border-gray-500 rounded-full text-sm transition ease-in-out duration-150 transform active:scale-95
              ${bgClass}
              ${disabled ? "opacity-80" : ""}
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
