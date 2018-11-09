import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Wrapper({
  noContainer,
  containerClassName,
  className,
  direction,
  expand,
  mode,
  isActive,
  ...otherProps
}) {
  const wrapperProps = Object.assign({}, otherProps);

  delete wrapperProps.visible;

  const element = (
    <div
      className={classNames(
        `row row-offcanvas-${expand} row-offcanvas-${direction} row-offcanvas-${mode} no-gutters h-100`,
        className,
        {
          active: isActive,
        },
      )}
      {...wrapperProps}
    />
  );

  if (noContainer) {
    return element;
  }

  return (
    <div
      style={{
        flex: '1 1 auto',
        overflow: 'hidden',
        height: '100%',
      }}
      className={classNames(containerClassName)}
    >
      {element}
    </div>
  );
}

Wrapper.defaultProps = {
  noContainer: false,
  containerClassName: 'container-fluid p-0',
  className: '',
  expand: 'lg',
  direction: 'left',
  mode: 'reveal',
  isActive: false,
};

Wrapper.propTypes = {
  noContainer: PropTypes.bool,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  expand: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'switch']),
  direction: PropTypes.oneOf(['left', 'right', 'bottom']),
  mode: PropTypes.oneOf(['reveal', 'push']),
  isActive: PropTypes.bool,
};
