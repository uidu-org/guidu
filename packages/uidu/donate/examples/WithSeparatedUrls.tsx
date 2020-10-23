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
import { createDonation, donationCampaign } from '../example-helpers';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

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
  const [currentContact, setCurrentContact] = useState({
    temporary: true,
    email: 'foo@uidu.org',
    firstName: 'Andrea',
  });
  const [donation, setDonation] = useState({ id, amount: 3000 });

  const updateDonation = async (model) =>
    setDonation({ ...donation, ...model });

  return (
    <Donate
      stripe={stripe}
      baseUrl={match.url}
      donation={donation}
      currentContact={currentContact}
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={donationCampaign}
      onCreate={(_donation, token) => console.log(token)}
      providers={[{ id: 'card', name: 'Credit Card' }]}
      updateDonation={updateDonation}
      updateCurrentContact={async (model) => setCurrentContact(model)}
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
