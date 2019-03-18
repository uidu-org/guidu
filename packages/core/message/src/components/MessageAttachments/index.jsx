// @flow

import React, { Component } from 'react';
import { Card } from '@uidu/media-card';
import { Identifier } from '@uidu/media-core';
import { FilmstripView } from '@uidu/media-filmstrip';
import { createUploadContext } from '@uidu/media-test-helpers';
import { MediaViewer, MediaViewerDataSource } from '@uidu/media-viewer';

const context = createUploadContext();

export type State = {
  selectedItem?: Identifier,
};

export default class MessageAttachments extends Component<{}, State> {
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
    const { attachments } = this.props;
    const { offset, animate, selectedItem } = this.state;

    return (
      <div className="mt-2 w-auto">
        <FilmstripView
          animate={animate}
          offset={offset}
          onSize={this.handleSizeChange}
          onScroll={this.handleScrollChange}
        >
          {attachments.map(attachment => (
            <Card
              key={attachment.id}
              context={context}
              identifier={attachment}
              onClick={() => this.setItem(attachment)}
            />
          ))}
        </FilmstripView>
        {selectedItem && (
          <MediaViewer
            context={context}
            selectedItem={selectedItem.identifier}
            dataSource={{ list: attachments }}
            onClose={this.onClose}
            pageSize={5}
          />
        )}
      </div>
    );
  }
}
