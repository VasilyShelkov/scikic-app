import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import { isUserInterested, fetchQuestion, answerQuestion } from './chatActions';
import Question from './Question';
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
    const { chat, onUserInterested, onAnswer } = this.props;
    return (
      <div>
        {
          <div className="ui segment transition hidden" ref={(node) => this.questions = node }>
            {chat.questions.list.map(question => (
              <Question questionId={question.id} string={question.string}
                answerType={question.expectedAnswerType} options={question.options}
                currentlySelected={!question.id === chat.questions.currentlySelected}
                answer={question.answer} onAnswer={(answer) => onAnswer(question.id, answer)}
              />
            ))}
          </div>
        }

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
  onAnswer: React.PropTypes.func,
};

const mapStateToProps = (state) => ({ chat: state.chat });

const mapDispatchToProps = (dispatch) => ({
  onUserInterested: (interested) => {
    if (interested) {
      dispatch(fetchQuestion());
    }
    dispatch(isUserInterested(interested));
  },
  onAnswer: (questionId, answer) => dispatch(answerQuestion(questionId, answer))
});


QuestionsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsList);
export default QuestionsList;
