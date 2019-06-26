import MediaFilmStrip from '@uidu/media-filmstrip';
import classNames from 'classnames';
import React, { Component } from 'react';
import { MessageAttachmentsProps } from '../../types';

export default class MessageAttachments extends Component<
  MessageAttachmentsProps
> {
  render() {
    const { attachments, className } = this.props;

    return (
      <div className={classNames('mt-2 w-auto', className)}>
        <MediaFilmStrip files={attachments} />
      </div>
    );
  }
}
