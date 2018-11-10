import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppActionBarDialog from './dialog';

export default class AppActionBar extends Component {
  constructor(props) {
    super(props);
    this.portalElement = null;
  }

  componentDidMount() {
    let p = null;
    if (!this.portalElement) {
      p = document.createElement('div');
      document.body.appendChild(p);
    }
    this.portalElement = p;
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { children, onSave, ...otherProps } = this.props;

    ReactDOM.render(
      <AppActionBarDialog
        ref={c => {
          this.AppActionBarDialog = c;
        }}
        {...otherProps}
      >
        {children}
      </AppActionBarDialog>,
      this.portalElement,
    );
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
    this.portalElement = null;
  }

  render() {
    return null;
  }
}
