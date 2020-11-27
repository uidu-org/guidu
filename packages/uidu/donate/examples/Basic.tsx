import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Donate from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';
import {
  createDonation,
  donationCampaign,
  subscribeToPlan,
  updateDonation,
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
    async function loadDonation() {
      await createDonation({}).then(setDonation);
    }
    loadDonation();
  }, []);

  useEffect(() => {
    setDonation((prevDonation) => ({
      ...prevDonation,
      contact: currentContact,
    }));
  }, [currentContact]);

  if (!donation) {
    return <div>Loading...</div>;
  }

  console.log(donation);

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
      createDonation={createDonation}
      updateDonation={async (model) =>
        updateDonation(donation, model).then(setDonation)
      }
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
