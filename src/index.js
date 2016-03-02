import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import App from './App';
import Scikic from './Scikic';
import Motivation from './infopages/Motivation';
import WhoMadeMe from './infopages/WhoMadeMe';
import FAQs from './infopages/FAQs'; 

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Scikic}/>
			<Route path="motivation" component={Motivation} />
			<Route path="who-made-me" component={WhoMadeMe} />
			<Route path="faqs" component={FAQs} />
		</Route>
	</Router>,
		document.getElementById('app')
);