import { useDispatch, useSelector } from "react-redux";
import { useSaveResult } from "../hooks/useSaveResult";
import { useEffect, useRef } from "react";
import { resetQuiz } from "../dataSlice";

function FinishScreen() {
  const { saveResult, isError } = useSaveResult();
  const {
    ign,
    role,
    score,
    questions,
    userAnswers,
    quizCompleted,
    correctAnswers,
    hp,
    maxHp,
  } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const hasSaved = useRef(false);

  useEffect(() => {
    if (quizCompleted && ign && questions.length > 0 && !hasSaved.current) {
      const resultData = {
        ign: ign,
        main_role: role,
        score: score,
        correct_answers: correctAnswers,
        answers: userAnswers,
        created_at: new Date().toISOString(),
      };
      saveResult(resultData);
      hasSaved.current = true;
    }
  }, [
    quizCompleted,
    ign,
    role,
    score,
    questions.length,
    userAnswers,
    saveResult,
    correctAnswers,
  ]);

  const handleResetQuiz = () => {
    hasSaved.current = false;
    dispatch(resetQuiz());
  };

  const commonButtonStyles = `
    px-4 py-2 border-3 rounded-full text-md border-gray-500 cursor-pointer
    transition ease-in-out duration-150 transform
    active:scale-95
    `;

  const primaryActionStyles = `
    bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 text-black hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700
    `;

  const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
    `;

  if (!quizCompleted) {
    return null;
  }

  return (
    <div
      className="relative w-full min-h-screen flex justify-center items-center overflow-hidden px-4 py-8"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src="/bg3.jpg"
        className="relative w-full h-screen flex justify-center items-start overflow-hidden"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        alt="Background"
      />
      <div className="shadow-lg bg-[#302D31] border border-stone-500 p-10 w-full max-w-sm md:max-w-md flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ce9261]">
          Quiz Completed!
        </h2>

        {isError ? (
          <p className="text-[#ce9261] text-base md:text-xl">Error saving result.</p>
        ) : (
          <>
            <p className="text-base md:text-xl text-[#f5dac5]">
              Score: {hp} / {maxHp}
            </p>
            <p className="text-base md:text-xl text-[#f5dac5]">
              Correct Answers: {correctAnswers} / {questions.length}
            </p>
          </>
        )}

        <button
          onClick={handleResetQuiz}
          className={`
            mt-6
            ${commonButtonStyles}
            ${primaryActionStyles}
            ${focusStyles}
            text-yellow-400
            w-auto
          `}
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
