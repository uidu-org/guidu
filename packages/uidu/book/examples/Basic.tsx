import React from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import { HashRouter as Router, Route } from 'react-router-dom';
import Book from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';

function Basic() {
  return (
    <WidgetsExampleScaffold
      baseUrl="/packages/uidu/book"
      component={Book}
      appointment={{}}
      currentOrganization={{ name: 'Charity Water' }}
      bookable={{ name: 'The Spring' }}
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
