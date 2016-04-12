import React from 'react';

const InterestedInitialQuestion = ({ interested }) => (
  <div className="ui attached message">
    <div className="header">initial question {interested}</div>
    <br />
    <div className="ui fluid buttons">
      <button className="ui negative button">Yes!</button>
      <div className="or"></div>
      <button className="ui positive button">Nooooo</button>
    </div>
  </div>
);

export default InterestedInitialQuestion;
