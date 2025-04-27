import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../services/apiQuestions";

export const useQuestions = () => {
  const {
    data: fetchedQuestions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quizQuestions"],
    queryFn: fetchQuestions,
  });

  return { fetchedQuestions, isLoading, error, isError};
};
