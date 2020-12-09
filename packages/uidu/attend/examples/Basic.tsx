import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { WidgetsExampleScaffold } from '../../widgets/example-utils';
import { createOrder, event, updateOrder } from '../example-helpers';
import Attend from '../src';

function Basic() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function loadOrder() {
      await createOrder({}).then(setOrder);
    }
    loadOrder();
  }, []);

  if (!order) {
    return <div>Loading...</div>;
  }

  console.log(order);

  return (
    <WidgetsExampleScaffold
      component={Attend}
      baseUrl="/packages/uidu/attend"
      currentOrganization={{ name: 'Charity Water' }}
      onCreate={(_donation, token) => console.log(token)}
      event={event}
      order={order}
      attendance={{}}
      updateOrder={async (model) => {
        updateOrder(order, model).then(setOrder);
        console.log(model);
      }}
    />
  );
}

export default (props) => (
  <Router>
    <Route>
      <Basic {...props}></Basic>
    </Route>
  </Router>
);
