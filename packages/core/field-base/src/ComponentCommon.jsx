import PropTypes from 'prop-types';
import { styleClassNames } from './prop-types';

const ComponentCommon = () => null;

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
  disabled: false,
  showErrors: false,
  layout: 'vertical',
  label: '',
  help: undefined,
  errorMessages: [],
};

export default ComponentCommon;
