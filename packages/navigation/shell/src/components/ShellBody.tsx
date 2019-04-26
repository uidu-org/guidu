import React from 'react';
import { Body } from '../styled';

export default React.forwardRef((props: any, ref) => (
  <Body ref={ref} {...props} />
));
