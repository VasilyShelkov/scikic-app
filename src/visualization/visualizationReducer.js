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
  case RECEIVE_INFERENCE: {
    let nodes = [];
    if (action.questionInference.relationships.length > 0) {
      nodes = action.questionInference.relationships.reduce((nodesThatExist, relationship) => {
        if (nodesThatExist.indexOf(relationship.parent) === -1) {
          nodesThatExist.push(relationship.parent);
        }
        if (nodesThatExist.indexOf(relationship.child) === -1) {
          nodesThatExist.push(relationship.child);
        }
        return nodesThatExist;
      }, []);
    } else {
      nodes = Object.keys(action.questionInference.features)
    }
    return {
      ...state,
      facts: action.questionInference.facts,
      features: nodes.map(node => {
        if (action.questionInference.features[node]) {
          return {
            ...action.questionInference.features[node],
            node,
          };
        }

        return false;
      }).filter(feature => feature !== false),
      textInsights: action.questionInference.insights,
      nodes,
      relationships: action.questionInference.relationships,
    };
  }
  default:
    return state;
  }
};

export default visualizationReducer;
