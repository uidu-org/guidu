import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

export default class Loader extends Component {
  render() {
    if (this.props.loaded) {
      return this.props.children;
    }

    return (
      <div className={this.props.wrapperClassName}>
        <Spinner
          name={this.props.name}
          color={this.props.color}
          className={this.props.className}
          fadeIn="none"
        />
      </div>
    );
  }
}

Loader.propTypes = {
  loaded: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

Loader.defaultProps = {
  loaded: false,
  children: null,
  name: 'wave',
  color: 'red',
  className: null,
  wrapperClassName: 'd-flex align-items-center justify-content-center h-100',
};
