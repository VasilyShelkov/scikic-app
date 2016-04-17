import React from 'react';
import Typist from 'react-typist';
import { TextAnswer, MultipleOptionsAnswer } from './QuestionAnswerTypes';

const Question = ({
  questionId, string, answerType, options, currentlySelected, answer, onAnswer
}) => (
  <div key={`q${questionId}`}>
    <Typist className="inline" startDelay={500}
      cursor={{ hideWhenDone: currentlySelected }}
      onTypingDone={() => $(`#q${questionId}answer`).transition({
        animation: 'swing down',
        onComplete: () => {
          // if it's the dropdown then open it
          if (options && options.length > 4) {
            $(`#q${questionId}answer`).dropdown('show');
          }

          // if it's the text input then focus it
          // so the user can start typing without clicking on it first
          if (answerType === 'text') {
            $(`#q${questionId}answer > input`).focus();
          }
        }
      })}
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
        <MultipleOptionsAnswer questionId={questionId} options={options} answer={answer}
          onAnswer={onAnswer}
        />
      :
        <TextAnswer questionId={questionId} answer={answer} onAnswer={onAnswer} />
    }
  </div>
);
export default Question;
