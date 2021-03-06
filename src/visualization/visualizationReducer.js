import d3 from 'd3';
import {
  REQUEST_INFERENCE, RECEIVE_INFERENCE, SELECT_QUESTION_TO_VISUALIZE
} from './visualizationActions';

const categoryColors = d3.scale.category20();

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
  case RECEIVE_INFERENCE: {
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
  }
  case SELECT_QUESTION_TO_VISUALIZE:
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
    let colorIndex = Object.keys(action.previousQuestionInference.nodes).length + 1;
    if (action.questionInference.relationships.length > 0) {
      nodes = action.questionInference.relationships.reduce((nodesThatExist, relationship) => {
        let newNodesThatExist = { ...nodesThatExist };
        if (!nodesThatExist[relationship.parent]) {
          newNodesThatExist[relationship.parent] = {
            name: relationship.parent,
            color: categoryColors(colorIndex++)
          };
        }
        if (!nodesThatExist[relationship.child]) {
          newNodesThatExist[relationship.child] = {
            name: relationship.child,
            color: categoryColors(colorIndex++)
          };
        }
        return newNodesThatExist;
      }, action.previousQuestionInference.nodes);
    } else if (Object.keys(action.questionInference.features).length > 0) {
      Object.keys(action.questionInference.features).forEach(
        feature => {
          nodes[feature] = {
            name: feature,
            color: categoryColors(colorIndex++)
          };
        }
      );
      nodes = {
        ...nodes,
        ...action.previousQuestionInference.nodes,
      };
    } else {
      nodes = {};
    }

    const newFeatures = Object.keys(nodes).reduce((features, node) => {
      let updatedPreviousFeatureNode = false;

      // gets an updated features array if the node was created in a previous inference
      const updatedFeatures = features.map(feature => {
        if (feature.node === node) {
          updatedPreviousFeatureNode = true;
          return {
            ...action.questionInference.features[node],
            node,
            color: nodes[node].color,
          };
        }

        return feature;
      });

      // If there was a feature updated return the updatedFeatures
      if (updatedPreviousFeatureNode) {
        return updatedFeatures;
      } else if (action.questionInference.features[node]) {
        // otherwise check if that node exists in the new question inference's features
        // and add that to the end of the new features
        return [
          ...features,
          {
            ...action.questionInference.features[node],
            node,
            color: nodes[node].color
          }
        ];
      }

      return [...features];
    }, action.previousQuestionInference.features);

    let textInsights = Object.keys(action.questionInference.insights);

    const testInsightList = textInsights.reduce((justTextInsights, insight) => {
      if (!insight.includes('list') && !insight.includes('debug')) {
        return [...justTextInsights, action.questionInference.insights[insight]];
      }

      return justTextInsights;
    }, []);

    return {
      ...state,
      facts: action.questionInference.facts,
      features: newFeatures,
      textInsights: testInsightList,
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
