import { ShellMain } from '@uidu/shell';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { schemaGenerator } from '../examples-utils';
import Navigation from '../src';

export default function Basic() {
  return (
    <Router>
      <ShellMain>
        <div className="p-4">
          <Navigation
            className="border-bottom"
            schema={schemaGenerator({ align: 'left' })}
          />
          <Navigation
            className="border-bottom"
            schema={schemaGenerator({ align: 'center', animated: true })}
          />
          <Navigation
            className="border-bottom"
            schema={schemaGenerator({ align: 'right' })}
          />
        </div>
      </ShellMain>
    </Router>
  );
}
