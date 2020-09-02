import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Attend from '../src';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';

function Basic() {
  const [order, setOrder] = useState({});
  return (
    <WidgetsExampleScaffold
      component={Attend}
      baseUrl="/packages/uidu/attend"
      currentOrganization={{ name: 'Charity Water' }}
      donationCampaign={{ name: 'The Spring' }}
      onCreate={(_donation, token) => console.log(token)}
      event={{
        name: 'Pitch your failure - Berlin',
        location: { address: 'Berlin' },
        beginsAt: '06/17/2019',
        beginTime: '12:00',
        finishesAt: '06/18/2019',
        endTime: '12:00',
        tickets: [
          {
            id: '123',
            stripeId: '123',
            name: 'Free',
            price: 0,
            inventoryQuantity: 100,
          },
          {
            name: 'Backstage',
            id: '123-backstage',
            stripeId: '123-backstage',
            price: 1000,
            inventoryQuantity: 20,
          },
          {
            name: 'Premium',
            id: '123-premium',
            stripeId: '123-premium',
            price: 3500,
            inventoryQuantity: 20,
          },
        ],
      }}
      order={order}
      attendance={{}}
      createOrder={async (model) => {
        setOrder({
          ...model,
          attendances: model.items
            .filter((item) => item.quantity && item.quantity > 0)
            .reduce((res, item) => {
              res.push({ sku: item });
              return res;
            }, []),
          stripeAmount: 1200, // should be set by back-end
        });
      }}
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
