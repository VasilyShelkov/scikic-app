import { newPromiseChain, fetchPost } from './../utilities.js';

const scikicUrl = 'http://dev.scikic.org';

export const INTERESTED = 'INTERESTED';
export const isUserInterested = (interested) => {
  fetchQuestion();
  return ({
    type: INTERESTED,
    interested
  });
};

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
      .then(() => dispatch(requestNextQuestion))
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
