import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import { isUserInterested, fetchQuestion } from './chatActions';
import InterestedInitialQuestion from './InterestedInitialQuestion';


class QuestionsList extends Component {

  constructor(props) {
    super(props);
    this.initial = null;
    this.questions = null;
    this.uninterested = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.chat.interested !== prevProps.chat.interested) {
      if (this.props.chat.interested === false) {
        $(this.initial).transition({
          animation: 'slide down',
          onComplete: () => $(this.uninterested).transition('slide down')
        });
      }

      if (this.props.chat.interested && $(this.questions).is(':hidden')) {
        $(this.initial).transition({
          animation: 'slide down',
          onComplete: () => $(this.questions).transition('slide down')
        });
      }
    }
  }

  render() {
    const { chat, onUserInterested } = this.props;
    let optionButtons;
    return (
      <div>
        <div className="ui segment transition hidden" ref={(node) => this.questions = node }>
          {chat.questions.list.map(question => (
            <div key={`q${question.id}`}>
              <Typist className="inline" startDelay={500}
                cursor={{ hideWhenDone: !question.id === chat.questions.currentlySelected }}
                onTypingDone={() => $(optionButtons).transition('swing down')}
              >
                <img className="ui avatar image"
                  src="../images/EmilyTheStrange.png"
                  alt="Emily the Strange Scikic Logo"
                />
                &nbsp;
                {question.string}
              </Typist>
              <br />
              <div className="ui buttons transition hidden" ref={(node) => optionButtons = node}>
                {question.options.map((answerOption, i) => (
                  <button key={`q${question.id}o${i}`} className="ui button"
                    onClick={e => console.log($(e.target).text())}
                  >
                    {answerOption}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={(node) => this.initial = node }>
          <InterestedInitialQuestion interested={chat.interested} onClick={onUserInterested} />
        </div>

        <div className="transition hidden" style={{ width: '100%' }} ref={(node) => this.uninterested = node }>
          <div className="ui message">
            {chat.interested === false && (
              <Typist className="header" startDelay={1000}>
                It is a shame you do not want to try me . . . &nbsp; <br />
                Thank you for your interest !
              </Typist>
            )}
          </div>
        </div>
      </div>
    );
  }
}
QuestionsList.propTypes = {
  chat: React.PropTypes.object,
  onUserInterested: React.PropTypes.func,
};

const mapStateToProps = (state) => ({ chat: state.chat });

const mapDispatchToProps = (dispatch) => ({
  onUserInterested: (interested) => {
    if (interested) {
      dispatch(fetchQuestion());
    }
    dispatch(isUserInterested(interested));
  },
});


QuestionsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsList);
export default QuestionsList;
