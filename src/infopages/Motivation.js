import React from 'react';

const Motivation = () => (
	<div>
		<h1 className="ui center aligned icon block header">
			<i className="circular lab icon"></i>
			What do we hope to learn from this ?
		</h1>
		<div className="ui inverted raised segment">
			<div className="ui inverted relaxed divided list">
				<div className="item">
					<div className="image">
						<i className="big treatment icon"></i>
					</div>
					<div className="content">
						<div className="header">Medicine</div>
						<div className="description">
							<p>
								In the future with the data we could Assess the potential
								that internet and social media data can provide to personalised medicine.
							</p>
						</div>
					</div>
				</div>
				<div className="item">
					<div className="image">
						<i className="big student icon"></i>
					</div>
					<div className="content">
						<div className="header">Education Through Visualizing</div>
						<div className="description">
							<p>
								As well as the Scikic being a novel idea and interesting to use,
								ultimately coupled with its visualizations, the Scikic hopes to
								give insight to users about how machine learning works.
							</p>
						</div>
					</div>
				</div>
				<div className="item">
					<div className="image">
						<i className="big bar chart icon"></i>
					</div>
					<div className="content">
						<div className="header">Integrating Open Data Sets</div>
						<div className="description">
							<p>
								Investigating how it might be possible gain insights from different
								open data sets available from the internet.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Motivation;
