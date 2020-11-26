import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Apply from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';
import { call } from '../example-helpers';

function Basic() {
  const [currentContact, setCurrentContact] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [application, setApplication] = useState({});

  const updateApplication = async (model) =>
    setApplication({ ...application, ...model });

  return (
    <WidgetsExampleScaffold
      baseUrl="/packages/uidu/donate"
      component={Apply}
      application={application}
      currentContact={currentContact}
      currentOrganization={{ name: 'Charity Water' }}
      call={call}
      onCreate={(_donation, token) => console.log(token)}
      createApplication={async (model) =>
        createApplication(model).then(setApplication)
      }
      updateApplication={updateApplication}
      updateCurrentContact={async (model) => setCurrentContact(model)}
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
