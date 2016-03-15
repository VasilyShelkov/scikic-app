import React, { Component } from 'react';
import { Link } from 'react-router';
import EmailModal from './infopages/EmailModal';

class Menu extends Component {
  componentDidMount() {
    $('.ui.modal')
			.modal('attach events', '.email.item', 'show')
			.modal('setting', {
        detachable: false,
				observeChanges: true,
        blurring: true,
        transition: 'vertical flip',
        onApprove: () => {},
      });
  }

  render() {
    return (
			<div className="ui five item menu inverted">
				<Link to="/" className="item">
					<i className="big home icon"></i>
					Scikic
				</Link>
				<Link to="motivation" className="item">
					<i className="big lab icon"></i>
					Motivation
				</Link>
				<Link to="who-made-me" className="item">
					<i className="big child icon"></i>
					Who Made Me
				</Link>
				<Link to="faqs" className="item">
					<i className="big puzzle icon"></i>
					FAQs
				</Link>
				<a className="item email">
					<i className="big mail icon"></i>
					Email Us Questions
				</a>
				<EmailModal />
			</div>
		);
  }
}

export default Menu;
