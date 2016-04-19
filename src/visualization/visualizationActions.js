import { newPromiseChain, fetchPost } from './../utilities.js';

export const doVisualization = (questionId) =>
  (dispatch, getState) =>
    newPromiseChain()
      .then(() => dispatch(requestInference(questionId)))
      .then(() => {
        const questionsInferenceInfo = getState().chat.questions.list.reduce((completeQuestions, question) => {
          // if the question is before the requested id, isn't skipped and has an answer
          // then add it to the inference request body
          if (question.id <= questionId && !question.skipped && question.answer) {
            completeQuestions = {
              ...completeQuestions,
              questionsWithAnswer: [
                ...completeQuestions.list,
                {
                  ...getState().chat.questions.list[questionId].extraInfo,
                  answer: getState().chat.questions.list[questionId].answer
                },
              ]
            };

            if (getState().visualisation.questions[questionId]) {
              completeQuestions = {
                ...completeQuestions,
                facts: getState().visualisation.questions[questionId].facts
              };
            } else {
              completeQuestions = {
                ...completeQuestions,
                unprocessed: [
                  ...completeQuestions,
                  {
                    ...getState().chat.questions.list[questionId].extraInfo,
                    answer: getState().chat.questions.list[questionId].answer
                  }
                ]
              };
            }
            return completeQuestions;
          }

          return completeQuestions;
        }, { list: [], unprocessed: [], facts: {} });

        return ({
          version: '1',
          data: {
            questions_asked: questionsInferenceInfo.questionsWithAnswer,
            unprocessed_questions: questionsInferenceInfo.unprocessed,
            facts: questionsInferenceInfo.facts,
          },
          apikey: 'YOUR_API_KEY_HERE',
        });
      })
      .then(currentQuestionsWithAnswers => fetchPost('/inference', currentQuestionsWithAnswers))
      .then(response => response.json())
      .then(questionInference => dispatch(receiveInference(questionId, questionInference)))
      .then(() => startQuestionVisualization(questionId));

export const REQUEST_INFERENCE = 'REQUEST_INFERENCE';
export const requestInference = (questionId) => ({
  type: REQUEST_INFERENCE,
  questionId
});

export const RECEIVE_INFERENCE = 'RECEIVE_INFERENCE';
export const receiveInference = (questionId, questionInference) => ({
  type: RECEIVE_INFERENCE,
  questionId,
  questionInference,
});

export const START_QUESTION_VISUALIZATION = 'START_QUESTION_VISUALIZATION';
export const startQuestionVisualization = (questionId) => ({
  type: START_QUESTION_VISUALIZATION,
  questionId
});
