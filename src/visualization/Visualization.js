import React from 'react';
import { connect } from 'react-redux';

let Visualization = ({ questionInference, isDoingInference }) => (
  <div className="ui blurring segment">
    {questionInference}
    <div className={`ui ${isDoingInference ? 'active' : ''} dimmer`}>
      <div className="ui text loader">The Scicik is doing inference...</div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  questionInference: state.visualization.questions,
  isDoingInference: state.visualization.isFetchingQuestionInference,
});

// const mapDispatchToProps = (dispatch) => ({
//   onHideError: () => dispatch(hideErrorMessage()),
// });

Visualization = connect(
  mapStateToProps,
)(Visualization);
export default Visualization;
