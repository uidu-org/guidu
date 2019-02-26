import React from 'react';
import PrettyProps from 'pretty-proptypes';
import Button from '@uidu/button';
import components from './components';
import { ChevronDown, ChevronUp } from 'react-feather';

components.Button = ({ isCollapsed, ...rest }) => {
  return (
    <Button
      iconBefore={
        isCollapsed ? (
          <ChevronDown label="expandIcon" />
        ) : (
          <ChevronUp label="collapseIcon" />
        )
      }
      {...rest}
    />
  );
};

const Props = props => {
  return <PrettyProps components={components} {...props} />;
};

export default Props;
