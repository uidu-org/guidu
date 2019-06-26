import React from 'react';
import PropTypes from 'prop-types';

export default function Help({ help }) {
  return <small className="form-text text-muted">{help}</small>;
}

Help.propTypes = {
  help: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};
