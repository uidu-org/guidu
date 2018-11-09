import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class AttachmentsNew extends Component {
  constructor(props) {
    super(props);
  }

  add = e => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    this.props.onAdd(files);
  };

  getId = () =>
    this.props.id || ['attachment', Math.floor(Date.now() / 1000)].join('_');

  render() {
    const { className, name, multiple, children } = this.props;

    return (
      <label
        className={classNames(className)}
        ref={c => {
          this.uploader = c;
        }}
        htmlFor={this.getId()}
      >
        <input
          accept="*"
          type="file"
          id={this.getId()}
          name={name}
          className="d-none"
          onChange={this.add}
          multiple={multiple}
        />
        {children}
      </label>
    );
  }
}
