import React, { Component } from 'react';

export const TextAnswer = ({ questionId, answer, onAnswer }) => {
  let answerInput;
  const answeredStyle = { border: '1px solid #21BA45' };
  return (
    <div id={`q${questionId}answer`} className="ui fluid action input transition hidden">
      <input type="text" ref={node => answerInput = node} style={answer ? answeredStyle : {}}
        onKeyDown={(e) => {
          // will answer the question when the user clicks enter of the OK button below.
          if (e.keyCode === 13) {
            if (e.target.value.length > 0) {
              onAnswer(e.target.value);
            }
          }
        }}
      />
      <div className="ui labeled button">
        <button className={`ui ${answer && 'green'} button`} onClick={() => onAnswer(answerInput.value)}>
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
          $(`#q${this.props.questionId}answer .menu`)
            .removeClass('transition visible')
            .addClass('transition hidden');
          $(`#q${this.props.questionId}answer`).removeClass('active visible');
          this.props.onAnswer(value);
        }
      });
    }
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
            options.map(answerOption => (
              <button className={`ui ${answer && answerOption === answer && 'green'} button`}
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
                data-value={answerOption}
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
