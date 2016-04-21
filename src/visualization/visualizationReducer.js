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
    let nodes = {};
    if (action.questionInference.relationships.length > 0) {
      nodes = action.questionInference.relationships.reduce((nodesThatExist, relationship) => {
        if (!nodesThatExist[relationship.parent]) {
          nodesThatExist[relationship.parent] = { name: relationship.parent };
        }
        if (!nodesThatExist[relationship.child]) {
          nodesThatExist[relationship.child] = { name: relationship.child };
        }
        return nodesThatExist;
      }, {});
    } else if (Object.keys(action.questionInference.features).length > 0) {
      nodes = Object.keys(action.questionInference.features).forEach(
        feature => {
          nodes[feature] = { name: feature };
        }
      );
    } else {
      nodes = {};
    }
    return {
      ...state,
      facts: action.questionInference.facts,
      features: Object.keys(nodes).map(node => {
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
      relationships: action.questionInference.relationships.map(relationship => ({
        source: nodes[relationship.parent],
        target: nodes[relationship.child]
      })),
    };
  }
  default:
    return state;
  }
};

export default visualizationReducer;
