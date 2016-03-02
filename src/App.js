import React, { Component } from 'react';
import Menu from './Menu';

class App extends Component {
	render() {
		return (
			<div>
				<Menu/>
				<div className="container-fluid">
					<div className="row">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default App;