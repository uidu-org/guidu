import React from 'react';
import moment from 'moment';

import Select from './select';

export default function DateMonth({ ...otherProps }) {
  const months = moment()
    .localeData()
    ._months.map((item, index) => {
      return {
        id: index + 1,
        name: item.charAt(0).toUpperCase() + item.slice(1),
      };
    });
  return <Select {...otherProps} options={months} />;
}
