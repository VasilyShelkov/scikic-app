import React from 'react';
import Menu from './Menu';
import ErrorMessage from './ErrorMessage';

const App = ({ children }) => (
	<div>
		<Menu />
		<div className="container-fluid">
			<div className="row"></div>
			<div style={{ marginTop: '70px' }}>
				<div className="row">
					<ErrorMessage />
	      </div>
				<div className="row">
					{children}
	      </div>
			</div>
		</div>
	</div>
);

export default App;
