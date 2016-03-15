import expect from 'expect';
import deepFreeze from 'deep-freeze';
import chatReducer from './chatReducer';

describe(chatReducer, () => {
  it('should set interested to action', () => {
    const stateBefore = {};
    const action = {
      type: 'INTERESTED',
      interested: false,
    };

    const stateAfter = { interested: false };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
