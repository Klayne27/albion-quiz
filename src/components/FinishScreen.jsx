import { useDispatch, useSelector } from "react-redux";
import { useSaveResult } from "../hooks/useSaveResult";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { resetQuiz } from "../dataSlice";

function FinishScreen() {
  const dispatch = useDispatch();
  const { saveResult, isError } = useSaveResult();
  const queryClient = useQueryClient();

  const { ign, role, score, questions, userAnswers, quizCompleted } = useSelector(
    (state) => state.data
  );

  const hasSaved = useRef(false);

  useEffect(() => {
    if (quizCompleted && ign && questions.length > 0 && !hasSaved.current) {
      const resultData = {
        ign: ign,
        main_role: role,
        score: score,
        total_questions: questions.length,
        answers: userAnswers,
        created_at: new Date().toISOString(),
      };
      saveResult(resultData);
      hasSaved.current = true;
    }
  }, [quizCompleted, ign, role, score, questions.length, userAnswers, saveResult]);

  const handleResetQuiz = () => {
    hasSaved.current = false;
    dispatch(resetQuiz());

    queryClient.invalidateQueries(["quizQuestions"]);
  };

  if (!quizCompleted) {
    return null;
  }

  const commonButtonStyles = `
   px-3 py-2 border-3 rounded-full text-md border-gray-500 cursor-pointer
   transition ease-in-out duration-150 transform
   active:scale-95
 `;

  const primaryActionStyles = `
bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 text-black hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700
 `;

  const focusStyles = `
   focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
 `;

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center bg-gray-900 overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="shadow-lg bg-[#302D31] border border-stone-500 md:w-[25rem] md:h-[15rem] w-[20rem] h-[13rem] flex flex-col justify-center items-center max-w-sm md:max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#ce9261]">Quiz Completed!</h2>

        {isError ? (
          <p className="text-[#ce9261] ">Error saving result.</p>
        ) : (
          <p className="text-[#ce9261] ">Result saved!</p>
        )}

        <button
          onClick={handleResetQuiz}
          className={`
             mt-6 px-2
             ${commonButtonStyles} 
             ${primaryActionStyles} 
             ${focusStyles} 
             text-yellow-400 
           `}
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
