import React from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import { HashRouter as Router, Route } from 'react-router-dom';
import TaxReminder from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';

function Basic() {
  return (
    <WidgetsExampleScaffold
      baseUrl="/packages/uidu/tax-reminder"
      component={TaxReminder}
      donation={{}}
      currentOrganization={{ name: 'Charity Water' }}
      taxReturnCampaign={{ name: 'The Spring' }}
      onCreate={(_donation, token) => console.log(token)}
    />
  );
}

export default (props) => (
  <Router>
    <Route>
      <Basic {...props} />
    </Route>
  </Router>
);
