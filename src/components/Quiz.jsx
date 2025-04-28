import { useSelector } from "react-redux";
import Options from "./Options";
import NextButton from "./NextButton";
import { RxCross2 } from "react-icons/rx";
import Loader from "./Loader";

export default function Quiz() {
  const {
    ign,
    questions,
    currentQuestionIndex,
    quizCompleted,
    loadingQuestions,
    questionsError,
    score,
    hp,
    maxHp
  } = useSelector((state) => state.data);

  if (loadingQuestions) {
    return <Loader />;
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

  const currentQuestion = questions[currentQuestionIndex];
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

  const questionsLength = questions.length;
  const maxPossibleScore = questions.reduce((acc, curr) => acc + (curr.points || 0), 0);
  const hpPercent = maxHp ? (hp / maxHp) * 100 : 0;

  const remainingHp = maxPossibleScore - score
  const remainingCount = questionsLength - currentQuestionIndex;
  const manaPercent = questionsLength ? (remainingCount / questionsLength) * 100 : 0;

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center py-8"
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
      <div className="border-4 border-[#b38968] relative bg-gradient-to-b from-[#e4c1a7] via-[#c7a387] to-[#c7a387] p-6 shadow-md w-full max-w-sm md:w-[46rem] lg:max-w-screen-md flex flex-col gap-5">
        <button
          type="button"
          className={`right-5 p-1 border-3 rounded-full text-sm border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 active:from-stone-950 active:via-stone-900 active:to-stone-700 text-yellow-400 cursor-pointer active:bg-[#4c5155] absolute  ${commonHoverActiveStyles} ${focusStyles}`}
        >
          <RxCross2 size={20} style={{ strokeWidth: "10%" }} />
        </button>
        <div className="flex items-center">
          <img
            src="./avatar11.png"
            className="w-24 h-24  sm:w-24 sm:h-24 z-2"
            alt="Player Avatar"
          />
          <div className="flex flex-col absolute z-1 ml-19">
            <div className="border-t border-r border-[#cea383] text-center text-[20px] font-bold text-[#4e2c08] shadow-lg justify-center bg-gradient-to-b from-[#e7b995] via-[#e4c1a7] to-[#e0b18d] rounded-b max-w-[15rem]">
              {ign}
            </div>
            <div className="flex flex-col border-x-5 border-y-2 rounded-b-md border-gray-700 bg-gray-700  w-[15rem]">
              <div className="relative w-full h-5 bg-[#e4c1a7] rounded-md overflow-hidden max-w-[20rem]">
                <div
                  className="h-full bg-gradient-to-b from-[#800202] via-[#b30b0b] to-[#b30b0b]"
                  style={{ width: `${hpPercent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white border-b-1 border-gray-700 text-shadow-lg">
                  {hp} / {maxHp}
                </div>
              </div>
              <div className="relative w-full h-5 bg-[#e4c1a7] rounded-md overflow-hidden">
                <div
                  className="h-full bg-gradient-to-b from-[#1d5391] via-[#2569b8] to-[#2569b8]"
                  style={{ width: `${manaPercent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white border-t-1 border-gray-700 text-shadow-lg">
                  {remainingCount * 20} / {questionsLength * 20}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg p-6 bg-[#FBCFA5]">
          <h2 className="text-xl font-bold mb-4 text-[#4e2c08]">
            {currentQuestion.question_text}
          </h2>
          <Options options={currentQuestion.options} />
          <div className="mt-6 text-center text-gray-600 flex justify-between items-center">
            <p className="flex justify-center items-center text-sm md:text-base">
              Question {currentQuestionIndex + 1} of {questionsLength}
            </p>
            <NextButton />
          </div>
        </div>
      </div>
    </div>
  );
}
