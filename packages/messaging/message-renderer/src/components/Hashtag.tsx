import React from 'react';
import StyledHashtag from '../styled/Hashtag';

export default props => {
  return (
    <a className="text-primary" href={props.children}>
      {props.children}
    </a>
  );
};
