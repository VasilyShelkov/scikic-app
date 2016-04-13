import React from 'react';
import Typist from 'react-typist';

const InterestedInitialQuestion = ({ interested, onClick }) => {
  let optionButtons;
  return (
    <div className="ui attached message">
      <Typist className="header" startDelay={1000}
        onTypingDone={() => $(optionButtons).transition('swing down')}
        cursor={{ hideWhenDone: !interested }}
      >
        Interested ? &nbsp;
      </Typist>
      <br />
      <div className="ui fluid buttons transition hidden" ref={(node) => optionButtons = node}>
        <button className="ui positive button" onClick={() => onClick(true)}>Yes!</button>
        <div className="or"></div>
        <button className="ui negative button" onClick={() => {
          $(optionButtons).transition('swing down');
          $('.Typist.header').css('display', 'none');
          onClick(false);
        }}>
          Nooooo
        </button>
      </div>
      {interested === false && (
        <Typist className="header" startDelay={1000}>
          It is a shame you do not want to try me . . . &nbsp; <br />
          Thank you for your interest !
        </Typist>
      )}
    </div>
  );
};

export default InterestedInitialQuestion;
