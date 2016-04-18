import {
  INTERESTED, REQUEST_NEXT_QUESTION, RECEIVE_NEXT_QUESTION,
  ANSWER_QUESTION, SKIP_QUESTION, SELECT_QUESTION
} from './chatActions';

let questionId = 0;

export const initialState = {
  questions: {
    list: [],
    isFetching: false,
    currentlySelected: false,
  },
  facts: {}
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
  case INTERESTED:
    return {
      ...state,
      interested: action.interested,
    };
  case REQUEST_NEXT_QUESTION:
    return {
      ...state,
      questions: {
        ...state.questions,
        isFetching: questionId,
      }
    };
  case RECEIVE_NEXT_QUESTION:
    return {
      ...state,
      questions: {
        list: [
          ...state.questions.list,
          questionReducer({}, action),
        ],
        isFetching: false,
        currentlySelected: questionId++,
      },
    };
  case ANSWER_QUESTION:
    return {
      ...state,
      questions: {
        ...state.questions,
        list: state.questions.list.map(question => questionReducer(question, action)),
      }
    };
  case SKIP_QUESTION:
    return {
      ...state,
      questions: {
        ...state.questions,
        list: state.questions.list.map(question => questionReducer(question, action)),
      }
    };
  case SELECT_QUESTION:
    return {
      ...state,
      questions: {
        ...state.questions,
        currentlySelected: action.questionId,
      }
    };
  default:
    return state;
  }
};


const questionReducer = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_NEXT_QUESTION:
    return {
      id: questionId,
      string: action.nextQuestion.question_string.question,
      expectedAnswerType: action.nextQuestion.question_string.type,
      options: action.nextQuestion.question_string.options,
      extraInfo: action.nextQuestion.question,
      skipped: false,
    };
  case ANSWER_QUESTION:
    if (action.questionId === state.id) {
      return {
        ...state,
        answer: action.answer,
        skipped: false,
      };
    }

    return state;
  case SKIP_QUESTION:
    if (action.questionId === state.id) {
      return {
        ...state,
        skipped: true,
      };
    }

    return state;
  default:
    return state;
  }
};

export default chatReducer;
