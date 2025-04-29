import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ign: "",
  role: "",
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  hp: 0,
  maxHp: 0,
  quizCompleted: false,
  loadingQuestions: true,
  questionsError: null,
  correctAnswers: 0,
  answerState: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setIgn(state, action) {
      state.ign = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
      state.loadingQuestions = false;
      state.questionsError = null;

      const total = action.payload.reduce((acc, curr) => acc + curr.points, 0);
      state.maxHp = total;
      state.hp = total;
    },
    setLoadingQuestions(state, action) {
      state.loadingQuestions = action.payload;
    },
    setQuestionsError(state, action) {
      state.questionsError = action.payload;
      state.loadingQuestions = false;
    },
    answerQuestion: (state, action) => {
      const current = state.questions[state.currentQuestionIndex];
      const picked = action.payload;

      if (state.answerState !== null) return;

      state.userAnswers.push(picked);

      if (picked === current.correct_answer) {
        state.answerState = "correct";
        state.score += current.points || 0;
        state.correctAnswers += 1;
      } else {
        state.answerState = "incorrect";
        const cost = current.points || 0;
        state.hp = Math.max(state.hp - cost, 0);
      }
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
      state.answerState = null;
    },
    finishQuiz(state) {
      state.quizCompleted = true;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.score = 0;
      state.quizCompleted = false;
      state.ign = "";
      state.answerState = null;
      state.correctAnswers = 0;
      state.role = "";
    },
  },
});

export default dataSlice.reducer;

export const {
  setIgn,
  setRole,
  setQuestions,
  setLoadingQuestions,
  setQuestionsError,
  nextQuestion,
  finishQuiz,
  answerQuestion,
  resetQuiz,
} = dataSlice.actions;
