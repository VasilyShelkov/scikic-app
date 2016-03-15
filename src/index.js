import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import App from './App';
import Scikic from './Scikic';
import Motivation from './infopages/Motivation';
import WhoMadeMe from './infopages/WhoMadeMe';
import FAQs from './infopages/FAQs';

const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Scikic} />
				<Route path="motivation" component={Motivation} />
				<Route path="who-made-me" component={WhoMadeMe} />
				<Route path="faqs" component={FAQs} />
			</Route>
		</Router>,
		rootElement
	);
};

if (module.hot) {
  // Support hot reloading of components
  const renderApp = render;

  // and display an overlay for runtime errors
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootElement
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}

render();
