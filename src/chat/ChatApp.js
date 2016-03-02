import React, { Component } from 'react';

const ChatApp = ({children}) => {
	return(
		<div className="col-xs-12 col-md-6 col-lg-5 col-xl-4">
			{children}
		</div>
	);
};

export default ChatApp;