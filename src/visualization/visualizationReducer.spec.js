import expect from 'expect';
import deepFreeze from 'deep-freeze';
import visualizationReducer, { initialState } from './visualizationReducer';
import * as actions from './visualizationActions';
import { exampleRecievedInference, examplePreviousInference } from './../utilities';
import d3 from 'd3';

describe('#visualizationReducer', () => {
  it('should request an inference for a question', () => {
    const stateBefore = initialState;
    const action = actions.requestInference(0);

    const stateAfter = {
      ...stateBefore,
      isFetchingQuestionInference: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(visualizationReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should recieve an inference for a question', () => {
    const categoryColors = d3.scale.category20();

    const stateBefore = initialState;
    const action = actions.receiveInference(0, exampleRecievedInference, examplePreviousInference);

    const stateAfter = {
      ...stateBefore,
      questions: {
        ...stateBefore.questions,
        0: {
          facts: exampleRecievedInference.facts,
          features: [{
            distribution: [0.5031111111111111, 0.4968888888888889],
            quartiles: { upper: 1, lower: 0, mean: 0.4968888888888889 },
            node: 'factor_gender',
            color: categoryColors(1)
          }, {
            distribution:[0, 0.09155555555555556, 0, 0.7893333333333333, 0.11911111111111111],
            quartiles: { upper: 3, lower: 3, mean: 2.936 },
            node: 'bg',
            color: categoryColors(1),
          }, {
            distribution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            quartiles: { upper: 33, lower: 33, mean: 33 },
            node: 'factor_age',
            color: categoryColors(2),
          }],
          textInsights: exampleRecievedInference.insights,
          nodes: {
            factor_gender: {
              name: 'factor_gender',
              color: categoryColors(1)
            },
            factor_age: {
              name: 'factor_age',
              color: categoryColors(2),
            },
            bg: {
              name: 'bg',
              color: categoryColors(1),
            },
            name: {
              name: 'name',
              color: categoryColors(3),
            },
          },
          relationships: [{
            source: {
              name: 'factor_gender',
              color: categoryColors(1)
            },
            target: {
              name: 'bg',
              color: categoryColors(1),
            }
          }, {
            source: {
              name: 'factor_age',
              color: categoryColors(2),
            },
            target: {
              name: 'name',
              color: categoryColors(3),
            },
          }, {
            source: {
              name: 'factor_age',
              color: categoryColors(2),
            },
            target: {
              name: 'bg',
              color: categoryColors(1),
            }
          }],
        }
      },
      isFetchingQuestionInference: false,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(visualizationReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
