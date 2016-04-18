import { newPromiseChain, fetchPost } from './../utilities.js';

export const doVisualization = (questionId) =>
  (dispatch, getState) =>
    newPromiseChain()
      .then(() => dispatch(requestInference(questionId)))
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
      .then(currentQuestionsWithAnswers => fetchPost('/inference', currentQuestionsWithAnswers))
      .then(response => response.json())
      .then(nextQuestion => dispatch(recieveInference(questionId)));
