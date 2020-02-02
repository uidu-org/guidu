import { ShellHeader } from '@uidu/shell';
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Attend from '..';

class Basic extends Component<any, any> {
  render() {
    return (
      <Router>
        <Route
          path="/"
          render={() => (
            <>
              <ShellHeader className="px-4 border-bottom">
                Test navigation
              </ShellHeader>
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
            </>
          )}
        ></Route>
      </Router>
    );
  }
}

export default Basic;
