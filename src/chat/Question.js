import React from 'react';
import Typist from 'react-typist';
import { TextAnswer, MultipleOptionsAnswer } from './QuestionAnswerTypes';

const Question = ({
  questionId, string, answerType, options, currentlySelected, answer, skipped, isVisualizing,
  onAnswer, onSkip, onSelectQuestion
}) => (
  <div key={`q${questionId}`} className="row"
    style={{
      border: skipped ? '1px solid #A333C8' : '',
      opacity: currentlySelected ? '1' : '.2'
    }}
    onClick={() => onSelectQuestion()}
  >
    <div className="container">
      <div className="row">
        <div className="col-xs-11">
          <Typist className="inline" startDelay={500} avgTypingDelay={40}
            cursor={{ hideWhenDone: !currentlySelected }}
            onTypingDone={() => $(`#q${questionId}answer`).transition({
              animation: 'swing down',
              onComplete: () => {
                // if it's the dropdown then open it
                if (options && options.length > 4 && currentlySelected) {
                  $(`#q${questionId}answer`).dropdown('show');
                }

                // if it's the text input then focus it
                // so the user can start typing without clicking on it first
                if (answerType === 'text' && currentlySelected) {
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
        </div>
        { !answer &&
          <div className="col-xs-1">
            <div className="circular ui tiny purple icon button" data-title="Skip Question"
              onClick={() => onSkip()}
            >
              <i className="level down icon"></i>
            </div>
          </div>
        }
      </div>

      <div className="row">
        {
          answerType === 'select' ?
            <MultipleOptionsAnswer questionId={questionId} options={options} answer={answer}
              onAnswer={onAnswer}
            />
          :
            <TextAnswer questionId={questionId} answer={answer} isVisualizing={isVisualizing}
              onAnswer={onAnswer}
            />
        }
      </div>
    </div>
  </div>
);

export default Question;
