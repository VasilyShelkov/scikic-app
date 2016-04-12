import React from 'react';
import { connect } from 'react-redux';
import isUserInterested from './chatActions';
import InterestedInitialQuestion from './InterestedInitialQuestion';


let QuestionsList = ({ chat, onUserInterested }) => (
  <div className="ui segment">
    {chat.interested ?
      'questions'
      :
        <InterestedInitialQuestion interested={chat.interested} onClick={onUserInterested} />}
  </div>
);

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
