import React from 'react';
import Tabs from '../src';

export default function Basic() {
  return (
    <div>
      <Tabs tabs={[{ label: 'Foo'}, { label: 'Test1'}]} />
    </div>
  )
}
