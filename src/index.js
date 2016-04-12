import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';
import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import Scikic from './Scikic';
import Motivation from './infopages/Motivation';
import WhoMadeMe from './infopages/WhoMadeMe';
import FAQs from './infopages/FAQs';

import chat from './chat/chatReducer';

const scikicApp = combineReducers({
  chat
});

const middlewares = [thunkMiddleware];

const finalStore = createStore(
  scikicApp,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={finalStore}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Scikic} />
          <Route path="motivation" component={Motivation} />
          <Route path="who-made-me" component={WhoMadeMe} />
          <Route path="faqs" component={FAQs} />
        </Route>
      </Router>
    </Provider>,
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
