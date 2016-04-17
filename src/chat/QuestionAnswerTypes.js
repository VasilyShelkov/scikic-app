import React, { Component } from 'react';

export const TextAnswer = ({ questionId }) => (
  <div id={`q${questionId}answer`} className="ui fluid action input transition hidden">
    <input type="text" />
    <div className="ui labeled button">
      <button className="ui toggle button">
        <i className="checkmark icon"></i> Ok
      </button>
      <div className="ui basic green left pointing label">
        press&nbsp;<strong>ENTER</strong>
      </div>
    </div>
  </div>
);

export class MultipleOptionsAnswer extends Component {
  componentDidMount() {
    $(`.dropdown[id="q${this.props.questionId}answer"]`).dropdown();
  }

  render() {
    const { questionId, options } = this.props;

    // for yes/no questions
    if (options.length === 2) {
      return (
        <div id={`q${questionId}answer`} className="ui fluid buttons transition hidden">
          <button className="ui positive labeled icon button">
            <i className="checkmark icon"></i>
            Yes
          </button>
          <div className="or"></div>
          <button className="ui negative labeled icon button">
            <i className="remove icon"></i>
            No
          </button>
        </div>
      );
    }

    // for questions with few options
    if (options.length < 4) {
      return (
        <div id={`q${questionId}answer`}
          className={`${options.length === 3 ? 'three' : 'four'} ui buttons transition hidden`}
        >
          {
            options.map(answerOption => (
              <button className="ui button">
                {answerOption}
              </button>
            ))
          }
        </div>
      );
    }

    // for questions with many options
    return (
      <div id={`q${questionId}answer`}
        className="ui fluid search selection dropdown transition hidden"
      >
        <i className="dropdown icon"></i>
        <div className="default text">Select an option...</div>
        <div className="menu">
          {
            options.map((answerOption, i) => (
              <div key={`q${questionId}o${i}`}
                data-id={`q${questionId}o${i}`} className="item option"
                onClick={e => console.log($(e.target).text())}
              >
                {answerOption}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
