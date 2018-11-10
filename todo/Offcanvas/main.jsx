import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Wrapper extends PureComponent {
  render() {
    const { className, children, componentRef, ...otherProps } = this.props;
    return (
      <main
        ref={componentRef}
        className={classNames(className, 'offcanvas-main l-scrollable h-100')}
        {...otherProps}
      >
        {children}
      </main>
    );
  }
}

Wrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  componentRef: PropTypes.func.isRequired,
};

Wrapper.defaultProps = {
  className: 'col-lg-9 col-xl-10',
};
