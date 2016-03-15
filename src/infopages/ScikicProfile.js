import React, { Component } from 'react';

const ScikicProfile = () => (
	<div>
		<div className="col-xs-12">
      <img src="../images/EmilyTheStrange.png"
        alt="Emily the Strange Scikic Logo"
        style={
					{ width: '300px', height: '300px', display: 'block', margin: 'auto' }
				} />
		</div>
    <h2 style={{ textAlign: 'center' }}>Welcome to the Scikic</h2>
    <p>
			I will ask you some basic questions
			(which you can choose to skip if you find them too personal)
			and with my psychic powers (and machine learning),
			I shall try to predict the unpredictable!
		</p>
		<p>
			Data will only be stored if you want to help Scikic and
			the University of Sheffield in the future.
			At the end you can choose to delete it.
		</p>
	</div>
);

export default ScikicProfile;
