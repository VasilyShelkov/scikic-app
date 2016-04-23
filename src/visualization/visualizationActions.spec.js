import expect from 'expect';
import * as actions from './visualizationActions';
import { exampleRecievedInference, examplePreviousInferenceFeatures } from './../utilities';

describe('#visualizationActions', () => {
  it('should create an action to request an inference', () => {
    const actualAction = actions.requestInference(0);
    const expectedAction = {
      type: actions.REQUEST_INFERENCE,
      questionId: 0,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to recieve an inference', () => {
    const actualAction = actions.receiveInference(0, exampleRecievedInference, examplePreviousInferenceFeatures);
    const expectedAction = {
      type: actions.RECEIVE_INFERENCE,
      questionId: 0,
      questionInference: exampleRecievedInference,
      previousQuestionInference: examplePreviousInferenceFeatures,
    };

    expect(actualAction).toEqual(expectedAction);
  });
});
