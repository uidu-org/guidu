import React, { Component } from 'react';
import 'swiper/dist/css/swiper.min.css';
import Attend from '..';

export default class Basic extends Component<any, any> {
  render() {
    return (
      <Attend
        event={{
          name: 'Pitch your failure - Berlin',
          location: { address: 'Berlin' },
          beginsAt: '06/17/2019',
          beginTime: '12:00',
          finishesAt: '06/18/2019',
          endTime: '12:00',
          tickets: [
            {
              stripeAttributes: {
                name: 'Free',
              },
              price: 0,
              inventoryQuantity: 100,
            },
            {
              stripeAttributes: {
                name: 'Backstage',
              },
              price: 1000,
              inventoryQuantity: 20,
            },
          ],
        }}
        attendance={{}}
      />
    );
  }
}
