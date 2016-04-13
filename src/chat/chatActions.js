import { newPromiseChain, fetchPost } from './../utilities.js'

const scikicUrl = 'http://dev.scikic.org'

export const INTERESTED = 'INTERESTED';
export const isUserInterested = (interested) => {
  fetchQuestion();
  return({
    type: INTERESTED,
    interested
  });
}

export const REQUEST_NEXT_QUESTION = 'REQUEST_NEXT_QUESTION';
export const requestNextQuestion = () => ({
  type: REQUEST_NEXT_QUESTION
});

export const RECIEVE_NEXT_QUESTION = 'RECIEVE_NEXT_QUESTION';
export const recieveNextQuestion = (nextQuestion) => ({
  type: RECIEVE_NEXT_QUESTION,
  nextQuestion
});

export const fetchQuestion = () => {
  return (dispatch, getState) =>
    newPromiseChain()
      .then(() => dispatch(requestNextQuestion))
      .then(() => ({
        version: '1',
        data: {
          questions_asked: getState().chat.questions,
          unprocessed_questions: ,
          facts: getState().chat.facts,
        }
        apikey: 'YOUR_API_KEY_HERE',
      }))
      .then(currentQuestions => fetchPost(`${scikicUrl}/question`, currentQuestions)
      .then(response => response.json())
      .then(nextQuestion => dispatch(recieveNextQuestion(nextQuestion)))
}
