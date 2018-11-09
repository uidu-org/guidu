import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from 'components/Loader';

export default class ActionBarDialog extends Component {
  componentDidMount() {}

  render() {
    const {
      actionBarClassName,
      className,
      children,
      ...otherProps
    } = this.props;

    return (
      <div
        {...otherProps}
        className={classNames(
          'actionbar animated slideInUp',
          actionBarClassName,
        )}
        tabIndex="-1"
        role="dialog"
        ref={c => {
          this.actionBar = c;
        }}
      >
        <div className="container-fluid" role="document">
          <div className="actionBar-content" role="document">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

ActionBarDialog.propTypes = {
  actionBarClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ActionBarDialog.defaultProps = {
  children: <Loader />,
  actionBarClassName: null,
  className: null,
};
