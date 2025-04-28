import { supabase } from "./supabase";

export const fetchQuestions = async (role) => {
  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("role_category", role);

  if (error) throw new Error("Error fetching quiz questions");

  return data;
};
