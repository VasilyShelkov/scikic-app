import { newPromiseChain, fetchPost } from './../utilities.js';

const scikicUrl = 'http://dev.scikic.org';

export const INTERESTED = 'INTERESTED';
export const isUserInterested = (interested) => ({
  type: INTERESTED,
  interested
});

export const REQUEST_NEXT_QUESTION = 'REQUEST_NEXT_QUESTION';
export const requestNextQuestion = () => ({
  type: REQUEST_NEXT_QUESTION
});

export const RECEIVE_NEXT_QUESTION = 'RECEIVE_NEXT_QUESTION';
export const receiveNextQuestion = (nextQuestion) => ({
  type: RECEIVE_NEXT_QUESTION,
  nextQuestion
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
            facts: getState().chat.facts,
          },
          apikey: 'YOUR_API_KEY_HERE',
        });
      })
      .then(currentQuestions => fetchPost(`${scikicUrl}/question`, currentQuestions))
      .then(response => response.json())
      .then(nextQuestion => dispatch(receiveNextQuestion(nextQuestion)));

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const answerQuestion = (questionId, answer) => ({
  type: ANSWER_QUESTION,
  questionId,
  answer,
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
})
