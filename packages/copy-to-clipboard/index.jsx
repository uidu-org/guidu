import React, { Component } from 'react';
import { Clipboard } from 'react-feather';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class CopyToClipboardWithMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  copy = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
  };

  render() {
    const { text, children } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={text} onCopy={this.copy}>
        {copied ? (
          <span className="text-success">Copied</span>
        ) : (
          <div className="d-flex align-items-center">
            <Clipboard size={16} className="mr-2" />
            <div>{children}</div>
          </div>
        )}
      </CopyToClipboard>
    );
  }
}
