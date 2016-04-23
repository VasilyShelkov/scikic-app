import React from 'react';
import { connect } from 'react-redux';
import ProbabilityChart from './ProbabilityChart';
import FeatureNetwork from './FeatureNetwork';

let Visualization = ({ questionInference, currentQuestionVisualizing, isDoingInference }) => (
  <div className="col-xs-12 col-md-6 col-lg-7 col-xl-8"
    style={{ height: `${$(window).height()}px` }}
  >
    { Object.keys(questionInference).length > 0 &&
      <div className="ui blurring segment">
        <div className="container">
          <div className="row">
            {currentQuestionVisualizing !== false ?
              questionInference[currentQuestionVisualizing].features.map(feature => (
                <ProbabilityChart feature={feature}
                  color={questionInference[currentQuestionVisualizing].color}
                  height={$(window).height() * 0.2}
                  margin={{ top: 20, right: 30, bottom: 30, left: 47 }}
                />
              ))
              :
              'no results to show'
            }
          </div>
          <div className="row">
            {currentQuestionVisualizing !== false ?
              <FeatureNetwork nodes={questionInference[currentQuestionVisualizing].nodes}
                links={questionInference[currentQuestionVisualizing].relationships}
                color={questionInference[currentQuestionVisualizing].color}
              />
              :
              'no results to show'
            }
          </div>
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

Visualization = connect(mapStateToProps)(Visualization);
export default Visualization;
