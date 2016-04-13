import React from 'react';
import Typist from 'react-typist';

const InterestedInitialQuestion = ({ onClick }) => {
  let optionButtons;
  return (
    <div className="ui attached message">
      <Typist className="header" startDelay={1000}
        onTypingDone={() => $(optionButtons).transition('swing down')}
      >
        Interested ? &nbsp;
      </Typist>
      <br />
      <div className="ui fluid buttons transition hidden" ref={(node) => optionButtons = node}>
        <button className="ui positive button" onClick={() => onClick(true)}>Yes!</button>
        <div className="or"></div>
        <button className="ui negative button" onClick={() => onClick(false)}>Nooooo</button>
      </div>
    </div>
  );
};

export default InterestedInitialQuestion;
