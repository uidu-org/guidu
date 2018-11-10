import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ModalBody = ({ style, className, children, onSave }) => (
  <div style={style} className={classNames(className, 'modal-body')}>
    {Children.map(children, child =>
      cloneElement(child, {
        onSave,
      }),
    )}
  </div>
);

ModalBody.propTypes = {
  style: PropTypes.shape(PropTypes.obj),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSave: PropTypes.func,
};

ModalBody.defaultProps = {
  style: {},
  className: null,
  onSave: () => {},
};

export default ModalBody;
