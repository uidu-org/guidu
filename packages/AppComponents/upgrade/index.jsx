import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class AppUpgrade extends PureComponent {
  render() {
    const { children, hasPlan } = this.props;

    if (hasPlan) {
      return children;
    }

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, .4)',
          position: 'relative',
          overflow: 'scroll',
        }}
      >
        <div className="d-flex h-100 justify-content-center align-items-center">
          <div className="container-fluid h-100 d-flex flex-column justify-content-center">
            <div className="row justify-content-center">
              <div className="col-sm-8">
                <div className="card card-body">Compra piano!</div>
                <div className="card card-body">Compra piano!</div>
                <div className="card card-body">Compra piano!</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="position-absolute"
          style={{ filter: 'blur(10px)', top: 0 }}
        >
          {children}
        </div>
      </div>
    );
  }
}

AppUpgrade.defaultProps = {
  hasPlan: false,
};

AppUpgrade.propTypes = {
  hasPlan: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
