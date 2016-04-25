import React from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import ProbabilityChart from './ProbabilityChart';
import FeatureNetwork from './FeatureNetwork';
import Typist from 'react-typist';

let Visualization = ({ questionInference, currentQuestionVisualizing, isDoingInference }) => (
  <div className="col-xs-12 col-md-6 col-lg-7 col-xl-8"
    style={{ height: `${$(window).height() * 0.9}px` }}
  >
    { Object.keys(questionInference).length > 0 &&
      questionInference[currentQuestionVisualizing] &&
      questionInference[currentQuestionVisualizing].features.length > 0 ?
        <div className="ui blurring raised segment">
          {currentQuestionVisualizing !== false &&
            <div className="ui big green ribbon label">
              <i className="bar chart icon"></i> Question {parseInt(currentQuestionVisualizing, 10) + 1}
            </div>
          }
          <div className="container">
            <div className="row">
              {currentQuestionVisualizing !== false &&
                questionInference[currentQuestionVisualizing].features.map(feature => (
                  <ProbabilityChart key={feature.node} feature={feature}
                    color={feature.color}
                    height={$(window).height() * 0.2}
                    margin={{ top: 10, right: 0, bottom: 10, left: 40 }}
                  />
                ))
              }
            </div>
            <div className="row">
              {currentQuestionVisualizing !== false &&
                <FeatureNetwork height={$(window).height() * 0.55} force={
                  d3.layout.force().charge(-1500).linkDistance(300)
                  .nodes(d3.values(questionInference[currentQuestionVisualizing].nodes))
                  .links(questionInference[currentQuestionVisualizing].relationships)
                  .on('tick', () => {
                    d3.select('g.paths').selectAll('path').attr('d', d => {
                      const dx = d.target.x - d.source.x;
                      const dy = d.target.y - d.source.y;
                      const dr = Math.sqrt(dx * dx + dy * dy);
                      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
                    });

                    d3.selectAll('g.node').attr('transform', d => `translate(${d.x}, ${d.y})`);
                  })
                }
                />
              }
            </div>
          </div>
        </div>
      :
        <div className="ui basic inverted center aligned segment" style={{ height: `${$(window).height() * 0.9}px` }}>
          <i className="massive bar chart icon" style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}></i>
        </div>
    }

    <div className={`ui ${isDoingInference ? 'active' : ''} dimmer`}>
      <div className="ui large text loader">The Scikic is working its magic...</div>
    </div>

    { Object.keys(questionInference).length > 0 &&
      questionInference[currentQuestionVisualizing] &&
      questionInference[currentQuestionVisualizing].textInsights.length > 0 && (
        <div className="ui raised very padded inverted segment">
          <div className="ui one huge inverted statistics">
            <div className="statistic">
              <div className="value">
                <i className="idea icon"></i> {questionInference[currentQuestionVisualizing].textInsights.length}
              </div>
              <div className="label">
                Insights
              </div>
            </div>
          </div>
          {questionInference[currentQuestionVisualizing].textInsights.map((insight, i) => (
            <Typist key={`insight${currentQuestionVisualizing}i${i}`}
              className="header" startDelay={1000} avgTypingDelay={40}
            >
              {insight}
              <br />
            </Typist>
          ))}
        </div>
      )
    }
  </div>
);

const mapStateToProps = (state) => ({
  questionInference: state.visualization.questions,
  currentQuestionVisualizing: state.visualization.questionVisualizing,
  isDoingInference: state.visualization.isFetchingQuestionInference,
});

Visualization = connect(mapStateToProps)(Visualization);
export default Visualization;
