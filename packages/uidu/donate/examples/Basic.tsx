import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Donate from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';
import {
  createDonation,
  donationCampaign,
  subscribeToPlan,
} from '../example-helpers';

function loadLocaleData(locale: string) {
  return import(`../dist/lang/${locale}.json`);
}

function Basic() {
  const [currentContact, setCurrentContact] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [donation, setDonation] = useState({});

  const updateDonation = async (model) =>
    setDonation({ ...donation, ...model });

  return (
    <WidgetsExampleScaffold
      loadLocaleData={loadLocaleData}
      baseUrl="/packages/uidu/donate"
      component={Donate}
      donation={donation}
      currentContact={currentContact}
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={donationCampaign}
      onCreate={(_donation, token) => console.log(token)}
      providers={[{ id: 'card', name: 'Credit Card' }]}
      subscribeToPlan={subscribeToPlan}
      createDonation={async (model) => createDonation(model).then(setDonation)}
      updateDonation={updateDonation}
      updateCurrentContact={async (model) => setCurrentContact(model)}
      currency="€"
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
