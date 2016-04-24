import expect from 'expect';
import { getPreviousQuestionId } from './utilities';

describe('#utilities', () => {
  it('should return false if there are no answered questions', () => {
    const proposedQuestionId = 0;
    const answeredQuestions = [];

    const previousQuestionId = false;

    expect(
      getPreviousQuestionId(proposedQuestionId, answeredQuestions)
    ).toEqual(previousQuestionId);
  });

  it('should return false if the proposed question id is the first question', () => {
    const proposedQuestionId = 0;
    const answeredQuestions = [3, 2, 3];

    const previousQuestionId = false;

    expect(
      getPreviousQuestionId(proposedQuestionId, answeredQuestions)
    ).toEqual(previousQuestionId);
  });

  it('should return itself if the proposed question id already exists', () => {
    const proposedQuestionId = 0;
    const answeredQuestions = [0, 4];

    const previousQuestionId = 0;

    expect(
      getPreviousQuestionId(proposedQuestionId, answeredQuestions)
    ).toEqual(previousQuestionId);
  });

  it('should return the previous question the proposed question would be in between 2 questions from unsorted answered list', () => {
    const proposedQuestionId = 2;
    const answeredQuestions = [4, 1, 3];

    const previousQuestionId = 1;

    expect(
      getPreviousQuestionId(proposedQuestionId, answeredQuestions)
    ).toEqual(previousQuestionId);
  });
});
