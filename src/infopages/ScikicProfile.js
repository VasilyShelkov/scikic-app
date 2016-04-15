import React from 'react';

const ScikicProfile = () => (
		<div className="ui fluid card">
			<div className="image">
				<img src="../images/EmilyTheStrange.png"
					alt="Emily the Strange Scikic Logo"
					style={{ width: '300px', height: '300px', display: 'block', margin: 'auto' }}
				/>
			</div>
			<div className="content">
				<h2 style={{ textAlign: 'center' }}>Welcome to the Scikic</h2>
				<div className="description">
					I will ask you some basic questions
					(which you can choose to skip if you find them too personal)
					and with my psychic(machine learning) powers,
					I shall try to predict the unpredictable!
				</div>
			</div>
			<div className="extra content">
				Data will only be stored if you want to help Scikic and
				the University of Sheffield in the future.
				At the end you can choose to delete it.
			</div>
		</div>
);

export default ScikicProfile;
