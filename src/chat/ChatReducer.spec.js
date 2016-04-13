import expect from 'expect';
import deepFreeze from 'deep-freeze';
import chatReducer, { initialState } from './chatReducer';
import * as actions from './chatActions';

describe(chatReducer, () => {
  let questionId = 1;

  it('should set interested to action', () => {
    const stateBefore = initialState;
    const action = actions.isUserInterested(false);

    const stateAfter = {
      ...initialState,
      interested: false
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should start fetching a new question with id', () => {
    const stateBefore = initialState;
    const action = actions.requestNextQuestion();

    const stateAfter = {
      ...initialState,
      questions: {
        ...initialState.questions,
        isFetching: questionId,
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
