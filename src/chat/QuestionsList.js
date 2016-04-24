import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import {
  isUserInterested, fetchQuestion, answerQuestionAndVisualize,
  skipQuestion, selectQuestionAndChangeQuestionVisualizing, displayErrorMessage
} from './chatActions';
import Question from './Question';
import InterestedInitialQuestion from './InterestedInitialQuestion';


class QuestionsList extends Component {

  constructor(props) {
    super(props);
    this.initial = null;
    this.questions = null;
    this.uninterested = null;
  }

  componentDidMount() {
    // correctly renders the components after changing routes
    if (this.props.chat.interested) {
      $(this.initial).addClass('transition hidden');
      $(this.uninterested).addClass('transition hidden');
    } else if (this.props.chat.interested === false) {
      $(this.questions).addClass('transition hidden');
      $(this.initial).addClass('transition hidden');
    } else {
      $(this.questions).addClass('transition hidden');
      $(this.uninterested).addClass('transition hidden');
    }
  }

  componentDidUpdate(prevProps) {
    // initializing the skip question button's tooltip popup
    $('.icon.button').popup();
    // if the interested state has changed
    if (this.props.chat.interested !== prevProps.chat.interested) {
      // hide the initial interested question and show the uninterested message
      if (this.props.chat.interested === false) {
        $(this.initial).transition({
          animation: 'slide down',
          onComplete: () => $(this.uninterested).transition('slide down')
        });
      }

      // hide the initial interested question and show the questions to ask the user...
      if (this.props.chat.interested) {
        $(this.initial).transition({
          animation: 'slide down',
          onComplete: () => $(this.questions).transition('slide down')
        });
      }
    }
  }

  render() {
    const { chat, onUserInterested, onAnswer, onSkip, onSelectQuestion, onError } = this.props;
    return (
      <div>
        {
          <div className="ui segment" ref={(node) => this.questions = node }>
            <div className="container">
              {chat.questions.list.map(question => (
                <Question questionId={question.id} string={question.string}
                  answerType={question.expectedAnswerType} options={question.options}
                  currentlySelected={question.id === chat.questions.currentlySelected}
                  skipped={question.skipped} answer={question.answer}
                  isVisualizing={chat.isVisualizing}
                  onAnswer={(answer) => {
                    if (!chat.isVisualizing) {
                      onAnswer(question.id, answer);
                    } else {
                      onError('Wait for the visualization to finish before editing your answer...');
                    }
                  }}
                  onSkip={() => {
                    if (!question.skipped && !question.answer) {
                      onSkip(question.id, question.skipped);
                    }
                  }
                  }
                  onSelectQuestion={() => {
                    if (!chat.isVisualizing) {
                      if (question.id !== chat.questions.currentlySelected) {
                        onSelectQuestion(question.id);
                      }
                    } else {
                      onError('Wait for the visualization to finish before selecting a different question');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        }

        <div ref={(node) => this.initial = node }>
          <InterestedInitialQuestion interested={chat.interested} onClick={onUserInterested} />
        </div>

        <div style={{ width: '100%' }} ref={(node) => this.uninterested = node }>
          <div className="ui message">
            {chat.interested === false && (
              <Typist className="header" startDelay={1000} avgTypingDelay={40}>
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
  onSkip: React.PropTypes.func,
  onSelectQuestion: React.PropTypes.func,
};

const mapStateToProps = (state) => ({ chat: state.chat });

const mapDispatchToProps = (dispatch) => ({
  onUserInterested: (interested) => {
    if (interested) {
      dispatch(fetchQuestion());
    }
    dispatch(isUserInterested(interested));
  },
  onAnswer: (questionId, answer) => dispatch(answerQuestionAndVisualize(questionId, answer)),
  onSkip: (questionId) => {
    dispatch(skipQuestion(questionId));
    dispatch(fetchQuestion());
  },
  onSelectQuestion: questionId => dispatch(selectQuestionAndChangeQuestionVisualizing(questionId)),
  onError: message => dispatch(displayErrorMessage(message)),
});


QuestionsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsList);
export default QuestionsList;
