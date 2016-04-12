import React from 'react';
import QuestionsList from './QuestionsList';

const ChatApp = ({ children }) => (
	<div className="col-xs-12 col-md-6 col-lg-5 col-xl-4">
		{children}
		<br />
		<QuestionsList />
	</div>
);

export default ChatApp;
