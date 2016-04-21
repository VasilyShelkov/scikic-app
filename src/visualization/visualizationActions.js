import { newPromiseChain, fetchPost } from './../utilities';
import { finishVisualization, fetchQuestion, selectQuestion } from './../chat/chatActions';

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
      .then(() => dispatch(startQuestionVisualization(questionId)))
      .then(() => dispatch(finishQuestionVisualization(questionId)));

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

export const finishQuestionVisualization = (questionId) =>
  (dispatch, getState) => {
    const lastQuestionId = getState().chat.questions.list.length - 1;
    // checks if the current question visualized was the last question asked
    if (questionId === lastQuestionId) {
      // then notify the end of the visualizations and fetch the next question for the user
      dispatch(finishVisualization());
      dispatch(fetchQuestion());
    } else {
      // otherwise, loop through the questions until the last question asked by the Scicik
      let newQuestionId = questionId;
      do {
        newQuestionId++;
        dispatch(selectQuestion(newQuestionId));
        // if the question has an answer do a new visualization
        if (getState().chat.questions.list[newQuestionId].answer) {
          dispatch(doVisualization(newQuestionId));
        }
        // keep looping until either got to the end of the questions asked
        // there is a question that isn't skipped
        // or there's another question that's been answered.
      } while (
        newQuestionId !== lastQuestionId &&
        !getState().chat.questions.list[newQuestionId].skipped &&
        !getState().chat.questions.list[newQuestionId].answer
      );
      // if the final doesn't have an answer, then select it for the user
      dispatch(finishVisualization());
      if (!getState().chat.questions.list[lastQuestionId].skipped) {
        dispatch(selectQuestion(lastQuestionId));
      } else {
        // otherwise fetch a new question
        dispatch(fetchQuestion());
      }
    }
  };
