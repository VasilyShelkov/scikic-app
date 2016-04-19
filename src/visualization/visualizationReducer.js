import {
  REQUEST_INFERENCE, RECEIVE_INFERENCE, START_QUESTION_VISUALIZATION
} from './visualizationActions';

export const initialState = {
  questions: {},
  questionVisualizing: false,
  isFetchingQuestionInference: false,
};

const visualizationReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_INFERENCE:
    return {
      ...state,
      isFetchingQuestionInference: true,
    };
  case RECEIVE_INFERENCE:
    return {
      ...state,
      questions: {
        ...state.questions,
        [action.questionId]: questionInference(
          state.questions[action.questionId],
          action
        )
      },
      isFetchingQuestionInference: false,
    };
  case START_QUESTION_VISUALIZATION:
    return {
      ...state,
      questionVisualizing: action.questionId,
    };
  default:
    return state;
  }
};

const questionInference = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_INFERENCE:
    return {
      ...state,
      facts: action.questionInference.facts,
      features: action.questionInference.features,
      textInsights: action.questionInference.insights,
      relationships: action.questionInference.relationships,
    };
  default:
    return state;
  }
};

export default visualizationReducer;
