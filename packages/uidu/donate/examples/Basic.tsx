import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Donate from '../';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';

function Basic() {
  const [currentMember, setCurrentMember] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [donation, setDonation] = useState({});

  const createDonation = async (model) => {
    setDonation(model);
    return {
      donation: {
        id: 'newly-created',
        ...model,
      },
      client_secret: 'foo',
    };
  };
  const updateDonation = async (model) =>
    setDonation({ ...donation, ...model });

  return (
    <WidgetsExampleScaffold
      baseUrl="/packages/uidu/donate"
      component={Donate}
      donation={donation}
      currentMember={currentMember}
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={{ name: 'The Spring' }}
      onCreate={(_donation, token) => console.log(token)}
      providers={[{ id: 'card', name: 'Credit Card' }]}
      createDonation={createDonation}
      updateDonation={updateDonation}
      updateCurrentMember={async (model) => setCurrentMember(model)}
      currency="€"
      pledges={[
        {
          id: 1,
          amount: 40,
          // name: 'A small help',
          // description: 'help buildind a school',
        },
        {
          id: 2,
          amount: 80,
          // name: 'A small help',
          // description: 'help buildind a school',
        },
        {
          id: 3,
          amount: 140,
          // name: 'A small help',
          // description: 'help buildind a school',
        },
      ]}
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
