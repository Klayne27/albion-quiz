import { supabase } from "./supabase";

export const saveQuizResult = async (resultData) => {
   try {

     const { data, error } = await supabase
       .from("quiz_results") 
       .insert([resultData]);

     if (error) {

       throw new Error(error.message);
     }

     return data;
   } catch (e) {
     console.error("Error in saveQuizResult function:", e);
     throw e; 
   }
};
