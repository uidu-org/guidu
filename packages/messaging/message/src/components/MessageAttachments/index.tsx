import MediaFilmStrip from '@uidu/media-filmstrip';
import classNames from 'classnames';
import React, { Component } from 'react';
import { MessageAttachmentsProps, MessageAttachmentsState } from '../../types';

export default class MessageAttachments extends Component<
  MessageAttachmentsProps,
  MessageAttachmentsState
> {
  state = {
    animate: false,
    offset: 0,
    selectedItem: undefined,
  };

  handleSizeChange = ({ offset }) => this.setState({ offset });

  handleScrollChange = ({ animate, offset }) =>
    this.setState({ animate, offset });

  setItem = selectedItem => {
    console.log(selectedItem);
    this.setState({ selectedItem });
  };

  onClose = () => {
    this.setState({ selectedItem: null });
  };

  render() {
    const { attachments, className } = this.props;
    const { offset, animate, selectedItem } = this.state;

    return (
      <div className={classNames('mt-2 w-auto', className)}>
        <MediaFilmStrip
          images={attachments.map(attachment => ({
            id: attachment.id,
            src: attachment.blob.downloadUrl,
            type: attachment.kind,
            alt: attachment.blob.name,
          }))}
        />
      </div>
    );
  }
}
