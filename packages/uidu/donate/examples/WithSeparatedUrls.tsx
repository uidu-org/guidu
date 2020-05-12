import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import Donate, { DonateDonation } from '../';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

const donationCampaign = {
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
          description: 'This allow us to purchase school materials for 1 kid ',
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
};

const createDonation = async (model) => {
  return {
    donation: {
      id: 'newly-created',
      ...model,
    },
    client_secret: 'foo',
  };
};

function NewDonation({}) {
  const history = useHistory();

  return (
    <DonateDonation
      donationCampaign={donationCampaign}
      handleSubmit={async (model) =>
        createDonation(model).then((donation) =>
          history.push(`/donations/${donation.donation.id}/preferences`),
        )
      }
    ></DonateDonation>
  );
}

function Basic({}) {
  const match = useRouteMatch();
  const { id } = useParams();
  console.log(id);
  const [currentMember, setCurrentMember] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [donation, setDonation] = useState({ id, amount: 3000 });

  console.log(donation);

  const updateDonation = async (model) =>
    setDonation({ ...donation, ...model });

  return (
    <Donate
      stripe={stripe}
      baseUrl={match.url}
      donation={donation}
      currentMember={currentMember}
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={donationCampaign}
      onCreate={(_donation, token) => console.log(token)}
      providers={[{ id: 'card', name: 'Credit Card' }]}
      updateDonation={updateDonation}
      updateCurrentMember={async (model) => setCurrentMember(model)}
      currency="€"
    />
  );
}

export default (props) => (
  <IntlProvider locale="en">
    <Router>
      <Switch>
        <Route path="/donations/:id">
          <Basic {...props}></Basic>
        </Route>
        <Route path="/">
          <NewDonation {...props}></NewDonation>
        </Route>
      </Switch>
    </Router>
  </IntlProvider>
);
