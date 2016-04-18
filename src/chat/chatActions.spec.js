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

  it('should create an action to signify the start of the visualization', () => {
    const actualAction = actions.startVisualization();
    const expectedAction = {
      type: actions.START_VISUALIZATION,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to signify the end of the visualization', () => {
    const actualAction = actions.finishVisualization();
    const expectedAction = {
      type: actions.FINISH_VISUALIZATION,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to skip a question', () => {
    const actualAction = actions.skipQuestion(0);
    const expectedAction = {
      type: actions.SKIP_QUESTION,
      questionId: 0,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to select a question', () => {
    const actualAction = actions.selectQuestion(0);
    const expectedAction = {
      type: actions.SELECT_QUESTION,
      questionId: 0,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to display an error', () => {
    const actualAction = actions.displayErrorMessage('error message');
    const expectedAction = {
      type: actions.DISPLAY_ERROR,
      message: 'error message',
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to hide an error', () => {
    const actualAction = actions.hideErrorMessage();
    const expectedAction = {
      type: actions.HIDE_ERROR,
    };

    expect(actualAction).toEqual(expectedAction);
  });
});
