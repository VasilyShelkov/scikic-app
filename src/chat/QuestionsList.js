import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isUserInterested } from './chatActions';
import InterestedInitialQuestion from './InterestedInitialQuestion';


class QuestionsList extends Component {

  componentDidMount() {
    console.log('did mount');
  }

  componentWillUpdate() {
    console.log('will update');
  }

  componentDidUpdate() {
    console.log('did update');
  }

  render() {
    console.log('render');
    const { chat, onUserInterested } = this.props;
    return (
      <div>
        {
          chat.interested ?
          'questions'
          :
            <InterestedInitialQuestion interested={chat.interested} onClick={onUserInterested} />
        }
      </div>
    );
  }
}
QuestionsList.propTypes = {
  chat: React.PropTypes.object,
  onUserInterested: React.PropTypes.func,
}

const mapStateToProps = (state) => ({ chat: state.chat });

const mapDispatchToProps = (dispatch) => ({
  onUserInterested: (interested) => {
    dispatch(isUserInterested(interested));
  },
});


QuestionsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsList);
export default QuestionsList;
