import expect from 'expect';
import deepFreeze from 'deep-freeze';
import chatReducer, { initialState } from './chatReducer';
import * as actions from './chatActions';
import { exampleRecievedQuestion } from './../utilities';

describe('#chatReducer', () => {
  let questionId = 0;

  it('should set interested to action', () => {
    const stateBefore = initialState;
    const action = actions.isUserInterested(false);

    const stateAfter = {
      ...stateBefore,
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
      ...stateBefore,
      questions: {
        ...stateBefore.questions,
        isFetching: questionId,
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should receive a new question', () => {
    const stateBefore = initialState;
    const action = actions.receiveNextQuestion(exampleRecievedQuestion);

    const stateAfter = {
      ...stateBefore,
      questions: {
        list: [
          ...stateBefore.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            skipped: false,
          }
        ],
        isFetching: false,
        currentlySelected: questionId++,
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should correctly set the currentlySelected id', () => {
    const stateBefore = {
      ...initialState,
      questions: {
        list: [
          ...initialState.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            skipped: false,
          }
        ],
        isFetching: true,
        currentlySelected: questionId,
      }
    };
    const action = actions.receiveNextQuestion(exampleRecievedQuestion);

    const stateAfter = {
      ...stateBefore,
      questions: {
        list: [
          ...stateBefore.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            skipped: false,
          }
        ],
        isFetching: false,
        currentlySelected: questionId++,
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should answer a question', () => {
    const stateBefore = {
      ...initialState,
      questions: {
        list: [
          ...initialState.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            skipped: false,
          }
        ],
        ...initialState.questions
      }
    };
    const action = actions.answerQuestion(questionId, 'answer');

    const stateAfter = {
      ...stateBefore,
      questions: {
        list: [
          ...initialState.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            answer: 'answer',
            skipped: false,
          }
        ],
        ...initialState.questions
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should skip a question', () => {
    const stateBefore = {
      ...initialState,
      questions: {
        list: [
          ...initialState.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            skipped: false,
          }
        ],
        ...initialState.questions,
      }
    };
    const action = actions.skipQuestion(questionId);

    const stateAfter = {
      ...stateBefore,
      questions: {
        list: [
          ...initialState.questions.list,
          {
            id: questionId,
            string: exampleRecievedQuestion.question_string.question,
            expectedAnswerType: exampleRecievedQuestion.question_string.type,
            options: exampleRecievedQuestion.question_string.options,
            extraInfo: exampleRecievedQuestion.question,
            answer: 'answer',
            skipped: true,
          }
        ],
        ...initialState.questions,
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should change the currently selected question', () => {
    const stateBefore = initialState;
    const action = actions.selectQuestion(0);

    const stateAfter = {
      ...stateBefore,
      questions: {
        ...stateBefore.questions,
        currentlySelected: 0,
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should signify that it is currently visualizing', () => {
    const stateBefore = initialState;
    const action = actions.startVisualization();

    const stateAfter = {
      ...stateBefore,
      isVisualizing: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should signify that it has finished visualizing', () => {
    const stateBefore = {
      ...initialState,
      isVisualizing: true,
    };
    const action = actions.finishVisualization();

    const stateAfter = {
      ...stateBefore,
      isVisualizing: false,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should display error message', () => {
    const stateBefore = initialState;
    const action = actions.displayErrorMessage('error message');

    const stateAfter = {
      ...stateBefore,
      error: 'error message',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should hide error message', () => {
    const stateBefore = {
      ...initialState,
      error: 'error message',
    };
    const action = actions.hideErrorMessage();

    const stateAfter = {
      ...stateBefore,
      error: false,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(chatReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
