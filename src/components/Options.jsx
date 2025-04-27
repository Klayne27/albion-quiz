import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../dataSlice";

function Options({ options }) {
  const { selectedAnswer, answerState } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleAnswer = (answer) => {
    if (answerState === null) {
      dispatch(selectAnswer(answer));
    }
  };

  const commonButtonStyles = `
      px-1 border-3 rounded-full text-sm border-gray-500 cursor-pointer
      transition ease-in-out duration-150 transform
      active:scale-95
    `;

  const stoneHoverActiveStyles = `
      hover:bg-gradient-to-b hover:from-stone-800 hover:via-stone-700 hover:to-stone-500
      active:bg-stone-950
    `;

  const selectedStyles = `
      bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-800
      hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500
      active:from-yellow-500 active:via-yellow-600 active:to-yellow-700
    `;

  const defaultStyles = `
      bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 text-yellow-400
      ${stoneHoverActiveStyles}
    `;

  const disabledStyles = `
       bg-gray-700 text-gray-400 cursor-not-allowed opacity-70
       hover:bg-gray-700 hover:text-gray-400
       active:scale-100
     `;

  const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-3 focus:ring-offset-gray-900
  `;

  return (
    <div className="flex flex-col gap-3">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option;

        const questionIsAnswered = answerState !== null;

        return (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={questionIsAnswered}
            className={`${focusStyles}
              ${commonButtonStyles}
              ${isSelected ? selectedStyles : defaultStyles}
              ${questionIsAnswered && !isSelected ? disabledStyles : ""} 
              ${!questionIsAnswered ? "cursor-pointer" : "cursor-not-allowed"} 
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
