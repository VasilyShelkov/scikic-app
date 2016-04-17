import expect from 'expect';
import * as actions from './chatActions';
import { exampleRecievedQuestion } from './../utilities';

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

  it('should create an action to request a new question', () => {
    const actualAction = actions.requestNextQuestion();
    const expectedAction = {
      type: actions.REQUEST_NEXT_QUESTION,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to receive a new question', () => {
    const actualAction = actions.receiveNextQuestion(exampleRecievedQuestion);
    const expectedAction = {
      type: actions.RECEIVE_NEXT_QUESTION,
      nextQuestion: exampleRecievedQuestion,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to answer a question', () => {
    const actualAction = actions.answerQuestion(0, 'answer');
    const expectedAction = {
      type: actions.ANSWER_QUESTION,
      questionId: 0,
      answer: 'answer',
    };

    expect(actualAction).toEqual(expectedAction);
  });
});
