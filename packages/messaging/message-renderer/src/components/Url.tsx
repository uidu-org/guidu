import React from 'react';
import StyledUrl from '../styled/Url';

const isInternal = ({ urlParts: { host } }) => document.domain === host;

export default props => {
  if (isInternal(props)) {
    return <StyledUrl as="a">{props.children}</StyledUrl>;
  }

  return (
    <StyledUrl href={props.children} target="_blank">
      {props.children}
    </StyledUrl>
  );
};
