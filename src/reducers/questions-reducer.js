const ADD_QUESTION = 'ADD-POST';

const initialState = {
  questions: [],
  newQuestionHeader: null
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      const newQuestion = {
        id: state.questions.length,
        header: state.newQuestionHeader,
      };
      state.questions.push(newQuestion);
      state.newQuestion = '';
      return state;
    default:
      return state;
  }
};

export const addQuestionActionCreator = () => ({ type: ADD_QUESTION });

export default questionsReducer;
