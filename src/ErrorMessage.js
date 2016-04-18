import React from 'react';
import { connect } from 'react-redux';
import { hideErrorMessage } from './chat/chatActions';

let ErrorMessage = ({ error, onHideError }) => {
  let errorMessage;
  return (
    <div className="col-xs-12">
      { error &&
        <div className="ui floating negative message" ref={node => errorMessage = node}>
          <i className="close icon"
            onClick={() => {
              $(errorMessage).transition({
                animation: 'fade',
                onComplete: () => onHideError()
              });
              $(errorMessage).transition('fade');
            }}
          />
          <div className="header">
            {error}
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({ error: state.chat.error });

const mapDispatchToProps = (dispatch) => ({
  onHideError: () => dispatch(hideErrorMessage()),
});


ErrorMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorMessage);
export default ErrorMessage;
