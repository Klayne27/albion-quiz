import { supabase } from "./supabase";

export const fetchQuestions = async () => {
  const { data, error } = await supabase.from("quiz_questions").select("*");

  if (error) throw new Error("Error fetching quiz questions");

  return data;
};
