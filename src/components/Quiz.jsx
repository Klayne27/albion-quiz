import { useSelector } from "react-redux";
import Options from "./Options";
import NextButton from "./NextButton";
import { RxCross2 } from "react-icons/rx";

export default function Quiz() {
  const {
    ign,
    questions,
    currentQuestionIndex,
    quizCompleted,
    loadingQuestions,
    questionsError,
  } = useSelector((state) => state.data);
  const currentQuestion = questions[currentQuestionIndex];

  if (loadingQuestions) {
    return <div className="text-center text-xl mt-8">Loading questions...</div>;
  }

  if (questionsError) {
    return (
      <div className="text-center text-xl mt-8 text-red-600">
        Error loading questions: {questionsError}
      </div>
    );
  }

  if (quizCompleted) {
    return null;
  }

  if (!currentQuestion) {
    return <div className="text-center text-xl mt-8">No questions available.</div>;
  }

  const commonHoverActiveStyles = `
    hover:bg-gradient-to-b hover:from-stone-800 hover:via-stone-700 hover:to-stone-500
    active:bg-stone-950
    active:scale-95
    transition ease-in-out duration-150
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
      <div className="bg-gradient-to-b from-[#e4c1a7] via-[#c7a387] to-[#c7a387] p-3 shadow-md w-full max-w-sm md:max-w-[40rem] md:min-w-[40rem] lg:max-w-screen-md">
        <div className="flex items-start gap-4 mb-4 sm:flex-row">
          <div className="flex flex-col gap-4">
            <img
              src="./avatar.png"
              className="w-17 h-17 border-[#9F7B5C] border-3 rounded-full mx-auto sm:w-24 sm:h-20"
              alt="Player Avatar"
            />
            <div className="mt-4 ml-1 text-xs text-gray-700 sm:text-left">
              <p>Member of:</p>
              <p className="font-semibold">Coalition</p>
            </div>
          </div>

          <div className="flex flex-col justify-center text-sm text-gray-800 w-full">
            <div className="flex gap-2 flex-col">
              <div className="flex justify-between w-full">
                <p className="text-2xl font-bold text-[#4e2c08]">{ign}</p>
                <button
                  type="button"
                  className={`px-1 border-3 rounded-full text-sm border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700 text-yellow-400 cursor-pointer active:bg-[#4c5155] ${commonHoverActiveStyles} ${focusStyles}`}
                >
                  <RxCross2 size={20} style={{ strokeWidth: "10%" }} />
                </button>
              </div>
              <div className="flex items-center text-xs bg-gradient-to-b from-[#c7a387] via-[#e4c1a7] to-[#c7a387] px-2 py-0.5 shadow-md w-[16rem]">
                <span className="flex gap-1">
                  <span>
                    <img src="/reputation.png" />
                  </span>
                  Glorious (Reputation: 50,000)
                </span>
              </div>
            </div>

            <div className="mt-1 bg-[#E8DDCE] px-3 py-1 rounded-xl border shadow-md border-gray-400 text-gray-700 text-sm italic w-[16rem]">
              Sinag #1
            </div>
          </div>
        </div>
        <div className="shadow-lg p-3 bg-[#FBCFA5]">
          <h2 className="text-md font-bold mb-4 text-[#4e2c08]">
            {currentQuestion.question_text}
          </h2>{" "}
          <Options options={currentQuestion.options} />
          <div className="mt-6 text-center text-gray-600 flex justify-between">
            <p className="flex justify-center items-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <NextButton />
          </div>
        </div>
      </div>
    </div>
  );
}
