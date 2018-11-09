import { Link as BaseLink } from 'react-router-dom';
import React from 'react';

const Link = ({ onClick, ...rest }) => (
  <BaseLink
    onClick={e => {
      if (performance.mark) {
        performance.clearMarks();
        performance.mark(`navigate-${rest.to}`);
      }
      if (onClick) onClick(e);
    }}
    {...rest}
  />
);

// exporting like this so it's just replace react-router-dom w/ thisFilePath
export { Link };
