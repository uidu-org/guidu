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
      donationCampaign={{
        name: 'The Spring',
        products: [
          {
            id: 'Z2lkOi8vdWlkdS9Qcm9kdWN0Lzk',
            stripeKind: 'service',
            skus: [],
            plans: [
              {
                id: 'Z2lkOi8vdWlkdS9QbGFuLzE2',
                name: 'Custom plan',
                interval: 'month',
                description: null,
                amount: 100,
                currency: '€',
              },
              {
                id: 'Z2lkOi8vdWlkdS9QbGFuLzI3',
                name: 'Bronze',
                interval: 'month',
                description:
                  'This allow us to purchase school materials for 1 kid ',
                amount: 1000,
                currency: '€',
              },
              {
                id: 'Z2lkOi8vdWlkdS9QbGFuLzI4',
                name: 'Silver',
                interval: 'month',
                description: 'With silver support you help 2 kids\n',
                amount: 2000,
                currency: '€',
              },
            ],
          },
          {
            id: 'Z2lkOi8vdWlkdS9Qcm9kdWN0LzMy',
            stripeKind: 'good',
            skus: [
              {
                id: 'Z2lkOi8vdWlkdS9Ta3UvMjQ',
                price: 100,
                stripeAttributes: {
                  name: 'Custom donation',
                },
                currency: '€',
              },
              {
                id: 'Z2lkOi8vdWlkdS9Ta3UvMjU',
                price: 1000,
                stripeAttributes: {
                  name: 'One-time bronze',
                },
                currency: '€',
              },
            ],
            plans: [],
          },
        ],
      }}
      onCreate={(_donation, token) => console.log(token)}
      providers={[{ id: 'card', name: 'Credit Card' }]}
      createDonation={createDonation}
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
