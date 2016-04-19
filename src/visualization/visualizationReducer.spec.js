import expect from 'expect';
import deepFreeze from 'deep-freeze';
import visualizationReducer, { initialState } from './visualizationReducer';
import * as actions from './visualizationActions';
import { exampleRecievedInference } from './../utilities';

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
    const stateBefore = initialState;
    const action = actions.receiveInference(0, exampleRecievedInference);

    const stateAfter = {
      ...stateBefore,
      questions: {
        ...stateBefore.questions,
        0: {
          facts: exampleRecievedInference.facts,
          features: exampleRecievedInference.features,
          textInsights: exampleRecievedInference.insights,
          relationships: exampleRecievedInference.relationships,
        }
      },
      isFetchingQuestionInference: false,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(visualizationReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
