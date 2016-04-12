import expect from 'expect';
import * as actions from './chatActions';

describe('#chatActions', () => {
  it('should create an action as to whether the user is interested', () => {
    const interested = true;

    const actualAction = actions.isUserInterested(interested);
    const expectedAction = {
      type: actions.INTERESTED,
      interested,
    };

    expect(actualAction).toEqual(expectedAction);
  });
});
