import React from 'react';
import Typist from 'react-typist';
import { TextAnswer, MultipleOptionsAnswer } from './QuestionAnswerTypes';

const Question = ({ questionId, string, answerType, options, currentlySelected }) => (
  <div key={`q${questionId}`}>
    <Typist className="inline" startDelay={500}
      cursor={{ hideWhenDone: currentlySelected }}
      onTypingDone={() => $(`#q${questionId}answer`).transition('swing down')}
    >
      <img className="ui avatar image"
        src="../images/EmilyTheStrange.png"
        alt="Emily the Strange Scikic Logo"
      />
      &nbsp;
      {string}
    </Typist>
    <br />
    {
      answerType === 'select' ?
        <MultipleOptionsAnswer questionId={questionId} options={options} />
      :
        <TextAnswer questionId={questionId} />
    }
  </div>
);
export default Question;
