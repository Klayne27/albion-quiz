import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../services/apiQuestions";
import { useSelector } from "react-redux";

export const useQuestions = () => {
  const role = useSelector(state=> state.data.role)

  const {
    data: fetchedQuestions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quizQuestions", role],
    queryFn: () => fetchQuestions(role),
  });

  return { fetchedQuestions, isLoading, error, isError};
};
