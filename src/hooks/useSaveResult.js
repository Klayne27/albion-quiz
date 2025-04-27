import { useMutation } from "@tanstack/react-query";
import { saveQuizResult } from "../services/apiResults";

export const useSaveResult = () => {
  const {
    mutate: saveResult,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: saveQuizResult,
    onSuccess: () => {
      console.log("Quiz result saved successfully!");
    },
    onError: (error) => {
      console.error("Error saving quiz result:", error);
    },
  });

  return { saveResult, isPending, isSuccess, isError };
};
