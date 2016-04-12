import React from 'react';
import Menu from './Menu';

const App = ({ children }) => (
	<div>
		<Menu />
		<div className="container-fluid">
			<div className="row">
				{children}
			</div>
		</div>
	</div>
);

export default App;
