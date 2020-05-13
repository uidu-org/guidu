import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Donate from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';
import {
  createDonation,
  donationCampaign,
  subscribeToPlan,
} from '../example-helpers';

function Basic() {
  const [currentMember, setCurrentMember] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [donation, setDonation] = useState({});

  const updateDonation = async (model) =>
    setDonation({ ...donation, ...model });

  return (
    <WidgetsExampleScaffold
      baseUrl="/packages/uidu/donate"
      component={Donate}
      donation={donation}
      currentMember={currentMember}
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={donationCampaign}
      onCreate={(_donation, token) => console.log(token)}
      providers={[{ id: 'card', name: 'Credit Card' }]}
      subscribeToPlan={subscribeToPlan}
      createDonation={async (model) => createDonation(model).then(setDonation)}
      updateDonation={updateDonation}
      updateCurrentMember={async (model) => setCurrentMember(model)}
      currency="€"
    />
  );
}

export default (props) => (
  <Router>
    <Route path="/">
      <Basic {...props}></Basic>
    </Route>
  </Router>
);
