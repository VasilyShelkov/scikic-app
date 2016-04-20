import React from 'react';
import { connect } from 'react-redux';

let Visualization = ({ questionInference, isDoingInference }) => (
  <div className="col-xs-12 col-md-6 col-lg-7 col-xl-8">
    { Object.keys(questionInference).length > 0 &&
      <div className="ui blurring segment">
        {JSON.stringify(questionInference)}
        <div className={`ui ${isDoingInference ? 'active' : ''} dimmer`}>
          <div className="ui text loader">The Scikic is working its magic...</div>
        </div>
      </div>
    }
  </div>
);

const mapStateToProps = (state) => ({
  questionInference: state.visualization.questions,
  isDoingInference: state.visualization.isFetchingQuestionInference,
});

const mapDispatchToProps = (dispatch) => ({});

Visualization = connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualization);
export default Visualization;
