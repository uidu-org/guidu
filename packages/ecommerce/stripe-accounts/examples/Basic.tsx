import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import 'swiper/dist/css/swiper.css';
import StripeAccounts from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <Router>
        <div>
          <div className="alert alert-info alert-dismissible" role="alert">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            Prima di attivare la funzionalità è necessario completare le
            seguenti informazioni
          </div>
          <StripeAccounts apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5" />
        </div>
      </Router>
    );
  }
}
