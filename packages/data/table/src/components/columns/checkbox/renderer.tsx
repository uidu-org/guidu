import React from 'react';
import { CheckSquare } from 'react-feather';

export default ({ value }) =>
  value === 'admin' ? <CheckSquare size={16} /> : null;
