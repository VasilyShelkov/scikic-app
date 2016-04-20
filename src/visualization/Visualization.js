import React from 'react';
import { connect } from 'react-redux';
import ProbabilityChart from './ProbabilityChart';

let Visualization = ({ questionInference, currentQuestionVisualizing, isDoingInference }) => (
  <div className="col-xs-12 col-md-6 col-lg-7 col-xl-8"
    style={{ height: `${$(window).height()}px` }}
  >
    { Object.keys(questionInference).length > 0 &&
      <div className="ui blurring segment">
        <div className="container">
          {currentQuestionVisualizing !== false ?
            questionInference[currentQuestionVisualizing].features.map(feature => (
              <div className="row">
                <ProbabilityChart feature={feature} />
              </div>
            ))
            :
            'no results to show'
          }
          </div>
      </div>
    }
    <div className={`ui ${isDoingInference ? 'active' : ''} dimmer`}>
      <div className="ui text loader">The Scikic is working its magic...</div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  questionInference: state.visualization.questions,
  currentQuestionVisualizing: state.visualization.questionVisualizing,
  isDoingInference: state.visualization.isFetchingQuestionInference,
});

const mapDispatchToProps = (dispatch) => ({});

Visualization = connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualization);
export default Visualization;
