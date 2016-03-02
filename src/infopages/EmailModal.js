import React, { Component } from 'react';

class EmailModal extends Component {
	render() {
		let from;
		return (
		 	<div className="ui modal" style={{right: 'auto', bottom: 'auto'}}>
			  
			  <div className="header">Drop us an Email</div>
			  
			  <div className="content">
			  	<div className="ui form">
			  		<input placeholder="Your Email Address" ref={node => {
			  			from = node;
			  		}} />
				  	<br/>
				  	<br/>
						<div className="field">
					  	<label>Questions</label>
					  	<textarea></textarea>
				  	</div>
			  	</div>
			  </div>
			  
			  <div className="actions">
			  	<div className="ui approve positive animated button">
			  		<div className="visible content">Send</div>
			  		<div className="hidden content">
			  			<i className="right send outline icon"></i>
			  		</div>
		  		</div>
			  	<div className="ui cancel button">Cancel</div>
				</div>
			
			</div>
		);
	}
}

export default EmailModal;