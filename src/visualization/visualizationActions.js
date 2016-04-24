import { newPromiseChain, fetchPost, getPreviousQuestionId } from './../utilities';
import {
  finishVisualization, fetchQuestion, selectQuestion, hideErrorMessage
} from './../chat/chatActions';

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

            // add questionWithAnswerToAdd to
            // completeQuestions.questionsWithAnswer(ultimately questions_asked)
            completeQuestions = {
              ...completeQuestions,
              questionsWithAnswer: [
                ...completeQuestions.questionsWithAnswer,
                questionWithAnswerToAdd
              ]
            };

            // add to facts if it's not the current question that's requested isDoingInference
            // and it has already been previously processed
            if (getState().visualization.questions[question.id] && question.id !== questionId) {
              completeQuestions = {
                ...completeQuestions,
                facts: {
                  ...completeQuestions.facts,
                  ...getState().visualization.questions[question.id].facts,
                },
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
      .then(questionInference => {
        let previousQuestionInference = {
          features: [],
          nodes: {}
        };
        const answeredQuestionIds = Object.keys(getState().visualization.questions);
        const previousQuestionId = getPreviousQuestionId(questionId, answeredQuestionIds);
        // previousQuestionId is false when there's no previous questions but can be 0
        if (previousQuestionId !== false && previousQuestionId >= 0) {
          previousQuestionInference = getState().visualization.questions[previousQuestionId];
        }
        dispatch(receiveInference(
          questionId,
          questionInference,
          previousQuestionInference
        ));
      })
      .then(() => dispatch(selectQuestionToVisualize(questionId)))
      .then(() => dispatch(finishQuestionVisualization(questionId)))
      .then(() => dispatch(hideErrorMessage()));

export const REQUEST_INFERENCE = 'REQUEST_INFERENCE';
export const requestInference = (questionId) => ({
  type: REQUEST_INFERENCE,
  questionId
});

export const RECEIVE_INFERENCE = 'RECEIVE_INFERENCE';
export const receiveInference = (questionId, questionInference, previousQuestionInference) => ({
  type: RECEIVE_INFERENCE,
  questionId,
  questionInference,
  previousQuestionInference,
});

export const SELECT_QUESTION_TO_VISUALIZE = 'SELECT_QUESTION_TO_VISUALIZE';
export const selectQuestionToVisualize = (questionId) => ({
  type: SELECT_QUESTION_TO_VISUALIZE,
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
        (
          getState().chat.questions.list[newQuestionId].skipped ||
          !getState().chat.questions.list[newQuestionId].answer
        )
      );

      if (newQuestionId === lastQuestionId) {
        // if the final doesn't have an answer, then select it for the user
        dispatch(finishVisualization());
        if (!getState().chat.questions.list[lastQuestionId].skipped) {
          dispatch(selectQuestion(lastQuestionId));
        } else {
          // otherwise fetch a new question
          dispatch(fetchQuestion());
        }
      }
    }
  };
