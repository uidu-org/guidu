import Button from '@uidu/button';
import PrettyProps from 'pretty-proptypes';
import React from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import components from './components';

components.Button = ({ isCollapsed, ...rest }) => {
  return (
    <Button
      iconBefore={isCollapsed ? <ChevronDown /> : <ChevronUp />}
      {...rest}
    />
  );
};

const Props = (props) => {
  return <PrettyProps components={components} {...props} />;
};

export default Props;
