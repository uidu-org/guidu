import React, { useEffect, useState } from 'react';
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
    // email: 'foo@uidu.org',
    // firstName: 'Andrea',
  });
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    createDonation(setDonation);
  }, []);

  useEffect(() => {
    setDonation((prevDonation) => ({
      ...prevDonation,
      contact: currentContact,
    }));
  }, [currentContact]);

  const updateDonation = async (model) =>
    setDonation({ ...donation, ...model });

  if (!donation) {
    return <div>Loading...</div>;
  }

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
      updateDonation={updateDonation}
      updateCurrentContact={async (model) => setCurrentContact(model.contact)}
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
