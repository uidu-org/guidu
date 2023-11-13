import Select from '@uidu/select';
import React from 'react';

export default function Grouper() {
  return (
    <Select
      name="foo"
      value="day"
      options={[
        { id: 'year', name: 'year' },
        { id: 'month', name: 'month' },
        { id: 'week', name: 'week' },
        { id: 'day', name: 'day' },
      ]}
    />
  );
}
