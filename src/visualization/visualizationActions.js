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
            const questionWithAnswerToAdd = {
              ...question.extraInfo,
              answer: question.answer
            };

            completeQuestions = {
              ...completeQuestions,
              questionsWithAnswer: [
                ...completeQuestions.questionsWithAnswer,
                questionWithAnswerToAdd
              ]
            };

            if (getState().visualization.questions[questionId]) {
              completeQuestions = {
                ...completeQuestions,
                facts: getState().visualization.questions[questionId].facts
              };
            } else {
              completeQuestions = {
                ...completeQuestions,
                unprocessed: [
                  ...completeQuestions.unprocessed,
                  questionWithAnswerToAdd
                ]
              };
            }
            return completeQuestions;
          }

          return completeQuestions;
        }, { questionsWithAnswer: [], unprocessed: [], facts: {} });

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
      .then(() => dispatch(startQuestionVisualization(questionId)));

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
