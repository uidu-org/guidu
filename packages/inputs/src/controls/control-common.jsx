import PropTypes from 'prop-types';

const ControlCommon = () => null;

ControlCommon.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default ControlCommon;
