import React from 'react';
import PropTypes from 'prop-types';
import { styleClassNames } from './prop-types';

const ComponentCommon = () => (
  <h1>This component just holds props and default props.</h1>
);

ComponentCommon.propTypes = {
  ...styleClassNames,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  help: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object,
  ]),
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  showErrors: PropTypes.bool,
  onChange: PropTypes.func,
  onSetValue: PropTypes.func,
};

ComponentCommon.defaultProps = {
  onChange: () => {},
  onSetValue: () => {},
  showErrors: false,
  layout: 'vertical',
  label: '',
  help: undefined,
  errorMessages: [],
};

export default ComponentCommon;
