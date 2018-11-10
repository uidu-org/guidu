import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActionBarDialog from './dialog';

export default class ActionBar extends Component {
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
      <ActionBarDialog
        ref={c => {
          this.actionBarDialog = c;
        }}
        {...otherProps}
      >
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            onSave,
          }),
        )}
      </ActionBarDialog>,
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
