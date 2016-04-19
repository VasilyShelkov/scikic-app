import React from 'react';
import ChatApp from './chat/ChatApp';
import ScikicProfile from './infopages/ScikicProfile';
import Visualization from './visualization/Visualization';

const Scikic = () => (
		<div>
			<ChatApp>
				<ScikicProfile />
			</ChatApp>
			<Visualization />
		</div>
);

export default Scikic;
