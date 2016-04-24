import { newPromiseChain, fetchPost } from './../utilities.js';
import { doVisualization } from './../visualization/visualizationActions';

export const INTERESTED = 'INTERESTED';
export const isUserInterested = (interested) => ({
  type: INTERESTED,
  interested
});

export const fetchQuestion = () =>
  (dispatch, getState) =>
    newPromiseChain()
      .then(() => dispatch(requestNextQuestion()))
      .then(() => {
        const questionMetas = getState().chat.questions.list.map(question => question.extraInfo);
        return ({
          version: '1',
          data: {
            questions_asked: questionMetas,
            unprocessed_questions: questionMetas,
            facts: {},
          },
          apikey: 'YOUR_API_KEY_HERE',
        });
      })
      .then(currentQuestions => fetchPost('/question', currentQuestions))
      .then(response => response.json())
      .then(nextQuestion => dispatch(receiveNextQuestion(nextQuestion)));

export const REQUEST_NEXT_QUESTION = 'REQUEST_NEXT_QUESTION';
export const requestNextQuestion = () => ({
  type: REQUEST_NEXT_QUESTION
});

export const RECEIVE_NEXT_QUESTION = 'RECEIVE_NEXT_QUESTION';
export const receiveNextQuestion = (nextQuestion) => ({
  type: RECEIVE_NEXT_QUESTION,
  nextQuestion
});

export const answerQuestionAndVisualize = (questionId, answer) =>
  (dispatch, getState) =>
    newPromiseChain()
      .then(() => dispatch(answerQuestion(questionId, answer)))
      .then(() => dispatch(startVisualization()))
      .then(() => dispatch(doVisualization(questionId)));

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const answerQuestion = (questionId, answer) => ({
  type: ANSWER_QUESTION,
  questionId,
  answer,
});

export const START_VISUALIZATION = 'START_VISUALIZATION';
export const startVisualization = () => ({
  type: START_VISUALIZATION,
});

export const FINISH_VISUALIZATION = 'FINISH_VISUALIZATION';
export const finishVisualization = () => ({
  type: FINISH_VISUALIZATION,
});

export const SKIP_QUESTION = 'SKIP_QUESTION';
export const skipQuestion = (questionId) => ({
  type: SKIP_QUESTION,
  questionId,
});

export const SELECT_QUESTION = 'SELECT_QUESTION';
export const selectQuestion = (questionId) => ({
  type: SELECT_QUESTION,
  questionId,
});

export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const displayErrorMessage = (message) => ({
  type: DISPLAY_ERROR,
  message,
});

export const HIDE_ERROR = 'HIDE_ERROR';
export const hideErrorMessage = () => ({
  type: HIDE_ERROR,
});
