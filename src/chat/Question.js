import React, { Component } from 'react';
import Typist from 'react-typist';

class Question extends Component {

  constructor(props) {
    super(props);
    this.optionButtons = null;
  }

  componentDidMount() {
    $(this.optionButtons).dropdown({});
  }

  render() {
    const { questionId, string, answerType, options, currentlySelected } = this.props;

    return (
      <div key={`q${questionId}`}>
        <Typist className="inline" startDelay={500}
          cursor={{ hideWhenDone: currentlySelected }}
          onTypingDone={() => $(this.optionButtons).transition('swing down')}
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
            <div className="ui fluid search selection dropdown transition hidden"
              ref={(node) => this.optionButtons = node}
            >
              <input type="hidden" name="country" onChange={(e) => {
                const userTypedInput = e.target.value;
                // if doesn't fit any of the options
                if (userTypedInput.length > 0 && options.indexOf(userTypedInput) === -1) {
                  // show the last item out the options which is normally 'Other'
                  $(`.item.option[data-id="q${questionId}o${options.length - 1}"]`).removeClass('item filtered');
                }
              }}
              />
              <i className="dropdown icon"></i>
              <div className="default text">Type or select an option...</div>
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
          :
            <div className="ui fluid action input" ref={(node) => this.optionButtons = node}>
              <input type={answerType} />
              <div className="ui labeled button">
                <button className="ui toggle button">
                  <i className="checkmark icon"></i> Ok
                </button>
                <div className="ui basic green left pointing label">
                  press&nbsp;<strong>ENTER</strong>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}
Question.propTypes = {
  questionId: React.PropTypes.number,
  string: React.PropTypes.string,
  answerType: React.PropTypes.string,
  options: React.PropTypes.array,
  currentlySelected: React.PropTypes.boolean
};

export default Question;
