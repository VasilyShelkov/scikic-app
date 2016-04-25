import React from 'react';

const WhoMadeMe = () => (
	<div className="container-fluid">
		<div className="ui raised very padded inverted segment">
			<div className="ui one huge inverted statistics">
				<div className="statistic" style={{ textAlign: 'center' }}>
					<div className="value">
						<i className="users icon"></i> 3
					</div>
					<div className="label">
						Team Members
					</div>
				</div>
			</div>
			<div className="ui centered link cards">
				<div className="card">
					<a className="image" href="http://inverseprobability.com" target="_blank">
						<img src="http://inverseprobability.com/assets/neil10.jpg" />
					</a>
					<div className="content">
						<a className="header" href="https://www.sheffield.ac.uk/neuroscience/staff/lawrence" target="_blank">Neil Lawrence</a>
						<div className="meta">
							<a>Professor of Machine Learning and Computational Biology</a>
						</div>
						<div className="description">
							Appointed at the University of Sheffield's Departments of Neuroscience and Computer Science
						</div>
					</div>
				</div>

				<div className="card">
					<a className="image" href="http://michaeltsmith.org.uk" target="_blank">
						<img src="http://www.michaeltsmith.org.uk/wp-content/uploads/2015/02/mts_s.jpg" />
					</a>
					<div className="content">
						<a className="header" href="http://siid.group.shef.ac.uk/team/dr-mike-smith/" target="_blank">Mike Smith</a>
						<div className="meta">
							<a>Post-Doctoral Research Associate</a>
						</div>
						<div className="description">
							Also at the University Of Sheffield in Neil Lawrence's Lab
						</div>
					</div>
				</div>

				<div className="card">
					<a className="image">
						<img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAT1AAAAJDJkOTdlYTUzLTNjZTEtNDkwYi1hOTg0LTIxOTYyYjkyYTQzNw.jpg" />
					</a>
					<div className="content">
						<div className="header">Vasily Shelkov</div>
						<div className="meta">
							<a>Developer, Traveller and Anime Lover</a>
						</div>
						<div className="description">
							University Of Sheffield Computer Science Graduate in 2016
						</div>
					</div>
					<div className="extra content">
						<span className="right floated">
							<i className="large blue linkedin square icon" href="https://github.com/VasilyShelkov"></i>
						</span>
						<span>
							<i className="large black github square icon" href="https://uk.linkedin.com/in/vasilyshelkov"></i>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default WhoMadeMe;
