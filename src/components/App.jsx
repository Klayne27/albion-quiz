import { useDispatch, useSelector } from "react-redux";
import IgnInput from "./IgnInput";

import Quiz from "./Quiz";
import FinishScreen from "./FinishScreen";
import { useEffect } from "react";
import { useQuestions } from "../hooks/useQuestions";
import { setLoadingQuestions, setQuestions, setQuestionsError } from "../dataSlice";

function App() {
  const dispatch = useDispatch();
  const { fetchedQuestions, isLoading, isError, error } = useQuestions();
  const ign = useSelector((state) => state.data.ign);
  const quizCompleted = useSelector((state) => state.data.quizCompleted);
  const questionsError = useSelector((state) => state.data.questionsError);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingQuestions(true));
    } else if (isError) {
      dispatch(setQuestionsError(error.message));
    } else if (fetchedQuestions) {
      dispatch(setQuestions(fetchedQuestions));
    }
  }, [fetchedQuestions, isLoading, isError, error, dispatch]);

  return (
    <div>
      {!ign && !questionsError && <IgnInput />}
      {ign && !quizCompleted && !questionsError && <Quiz />}
      {ign && quizCompleted && <FinishScreen />}
    </div>
  );
}

export default App;
