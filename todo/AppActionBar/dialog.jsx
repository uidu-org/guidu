import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from 'components/Loader';

export default function AppActionBarDialog({
  actionBarClassName,
  className,
  children,
  ...otherProps
}) {
  return (
    <div
      {...otherProps}
      className={classNames('app-actionbar', actionBarClassName)}
      tabIndex="-1"
      role="dialog"
    >
      <div className="container" role="document">
        <div className="appActionBar-content" role="document">
          {children}
        </div>
      </div>
    </div>
  );
}

AppActionBarDialog.propTypes = {
  actionBarClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AppActionBarDialog.defaultProps = {
  children: <Loader />,
  actionBarClassName: null,
  className: null,
};
