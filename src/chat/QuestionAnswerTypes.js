import React, { Component } from 'react';

export const TextAnswer = ({ questionId, answer, onAnswer, isVisualizing }) => {
  let answerInput, submit;
  const answeredStyle = { border: '1px solid #21BA45' };
  return (
    <div id={`q${questionId}answer`} className="ui fluid action input transition hidden">
      <input type="text" ref={node => answerInput = node} style={answer ? answeredStyle : {}}
        onKeyDown={(e) => {
          $(answerInput).removeAttr('value');
          // will answer the question when the user clicks enter of the OK button below.
          if (e.keyCode === 13) {
            const newAnswer = e.target.value;
            if (newAnswer.length > 0 && newAnswer !== answer && !isVisualizing) {
              onAnswer(e.target.value);
            } else {
              onAnswer(e.target.value);
              e.target.value = answer;
            }
          }
        }}
      />
      <div className="ui labeled button" ref={node => submit = node}>
        <button className={`ui ${answer && 'green'} button`}
          onClick={() => {
            const newAnswer = answerInput.value;
            if (newAnswer.length > 0 && newAnswer !== answer) {
              onAnswer(newAnswer);
            } else if (answer) {
              answerInput.value = answer;
            }
          }}
        >
          {answer && <i className="checkmark icon"></i>}
          Ok
        </button>
        <div className="ui basic green left pointing label">
          press&nbsp;<strong>ENTER</strong>
        </div>
      </div>
    </div>
  );
};

export class MultipleOptionsAnswer extends Component {
  componentDidMount() {
    if (this.props.options.length > 4) {
      $(`#q${this.props.questionId}answer`).dropdown({
        onChange: (value) => {
          // bug with when the dropdown already has the transition hidden class before answering questions
          $(`#q${this.props.questionId}answer .menu`)
            .removeClass('transition visible')
            .addClass('transition hidden');
          // to rectify make the menu transition hidden after changing
          // and stop the dropdown from being active visible
          $(`#q${this.props.questionId}answer`).removeClass('active visible');
          // already did try to reinitialize the dropdown in componentDidUpdate lifecycle...

          this.props.onAnswer(value);
        }
      });
    }
  }

  componentDidUpdate() {
    // reset the dropdown's text if the answer wasn't changed (ie when visualizing)
    if (this.props.answer) {
      $(`#q${this.props.questionId}answer`).dropdown('set text', this.props.answer);
    } else {
      // or set to default text if an answer hasn't already been selected
      // ie a different question was answered and still visualizing
      $(`#q${this.props.questionId}answer`).dropdown('restore default text');
    }

    // hide the dropdown if the question has changed in anyway
    $(`#q${this.props.questionId}answer`).dropdown('hide');
  }

  render() {
    const { questionId, options, answer, onAnswer } = this.props;

    // for questions with few options
    if (options.length <= 4) {
      let numberOfButtons = '';
      switch (options.length) {
      case 2:
        numberOfButtons = 'two';
        break;
      case 3:
        numberOfButtons = 'three';
        break;
      case 4:
        numberOfButtons = 'four';
        break;
      default:
        numberOfButtons = '';
      }

      return (
        <div id={`q${questionId}answer`}
          className={`${numberOfButtons} ui buttons transition hidden`}
        >
          {
            options.map((answerOption, i) => (
              <button key={`q${questionId}o${i}`}
                className={`ui ${answer && answerOption === answer && 'green'} button`}
                onClick={() => onAnswer(answerOption)}
              >
                {answer && answerOption === answer && <i className="checkmark icon"></i>}
                {answerOption}
              </button>
            ))
          }
        </div>
      );
    }

    // for questions with many options
    const answeredStyle = {
      borderTop: '1px solid #21BA45',
      borderBottom: '1px solid #21BA45',
      color: '#21BA45'
    };
    return (
      <div id={`q${questionId}answer`}
        className={`ui fluid pointing dropdown search ${answer ? 'green': ''} button ${!answer ? 'transition hidden' : ''}`}
      >
        <i className="dropdown icon"></i>
        <div className="default text">Select an option...</div>
        <div className="menu">
          {
            options.map((answerOption, i) => (
              <div key={`q${questionId}o${i}`} className="item option"
                style={answer && answerOption === answer ? answeredStyle : {}}
                data-value={answerOption} onClick={e => e.stopPropagation()}
              >
                {answer && answerOption === answer && <i className="checkmark green icon"></i>}
                {answerOption}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
