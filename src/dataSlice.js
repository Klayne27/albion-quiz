import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ign: "",
  role: "",
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  quizCompleted: false,
  loadingQuestions: true,
  questionsError: null,
  selectedAnswer: null,
  answerState: null,
};

const processAnswer = (state) => {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
  if (state.selectedAnswer !== null) {
    state.userAnswers.push(state.selectedAnswer);

    state.answerState = state.selectAnswer;
  } else {
    console.warn("Processing answer with no selected answer.");
    state.userAnswers.push(null);
    state.answerState = "unanswered";
  }

  if (currentQuestion && state.selectedAnswer === currentQuestion.correct_answer) {
    state.score += currentQuestion.points || 0;
  }

  state.selectedAnswer = null;
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
    },
    setLoadingQuestions(state, action) {
      state.loadingQuestions = action.payload;
    },
    setQuestionsError(state, action) {
      state.questionsError = action.payload;
      state.loadingQuestions = false;
    },
    selectAnswer: (state, action) => {
      if (state.answerState === null) {
        state.selectedAnswer = action.payload;
      }
    },

    nextQuestion: (state) => {
      processAnswer(state);

      state.selectedAnswer = null;
      state.answerState = null;
      state.currentQuestionIndex++;
    },
    finishQuiz(state) {
      processAnswer(state);

      state.quizCompleted = true;
      state.selectedAnswer = null;
      state.answerState = null;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.score = 0;
      state.quizCompleted = false;
      state.ign = "";
      state.selectedAnswer = null;
      state.answerState = null;

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
  selectAnswer,
  nextQuestion,
  finishQuiz,
  resetQuiz,
} = dataSlice.actions;
