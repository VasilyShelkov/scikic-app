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

  it('should create an action to request a new question', () => {
    const actualAction = actions.requestNextQuestion();
    const expectedAction = {
      type: actions.REQUEST_NEXT_QUESTION,
    };

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to recieve a new question', () => {
    const exampleRecievedQuestion = {
      facts: {},
      question_string: {
        type: 'select',
        question: 'How do you travel to work?',
        options: [
          'Not in employment',
          'Work mainly from home',
          'Train/Tram/underground',
          'Bus',
          'Car/van',
          'Bicycle',
          'On Foot',
          'Other'
        ],
      },
      question: {
        detail: '',
        dataitem: 'travel',
        dataset: 'lifestyle'
      }
    };

    const actualAction = actions.recieveNextQuestion(exampleRecievedQuestion);
    const expectedAction = {
      type: actions.RECIEVE_NEXT_QUESTION,
      nextQuestion: exampleRecievedQuestion,
    };

    expect(actualAction).toEqual(expectedAction);
  });
});
