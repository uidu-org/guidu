import * as React from 'react';
import {
  defaultCollectionName,
  createUploadContext,
} from '@uidu/media-test-helpers';
import { Card, CardEvent } from '@uidu/media-card';
import { MediaViewer } from '@uidu/media-viewer';
import { FileDetails, FileIdentifier, Identifier } from '@uidu/media-core';
import Button from '@uidu/button';
import Select from '@uidu/select';
import { SelectWrapper, OptionsWrapper } from '../example-helpers/styled';
import {
  MediaPicker,
  UploadPreviewUpdateEventPayload,
  MediaFile,
  Popup,
} from '../src';

const context = createUploadContext();

const dataSourceOptions = [
  { label: 'List', value: 'list' },
  { label: 'Collection', value: 'collection' },
];

export type TenantFileRecord = {
  id: string;
  occurrenceKey?: string;
};
export type DataSourceType = 'collection' | 'list';
export interface State {
  events: Array<TenantFileRecord>;
  selectedItem?: Identifier;
  dataSourceType: DataSourceType;
  popup?: Popup;
}

export default class Example extends React.Component<{}, State> {
  state: State = { events: [], dataSourceType: 'list' };

  async componentDidMount() {
    const popup = await MediaPicker('popup', context, {
      uploadParams: {
        collection: defaultCollectionName,
      },
    });

    popup.on('uploads-start', (payload: { files: MediaFile[] }) => {
      const { events } = this.state;
      payload.files.forEach(file => {
        file.upfrontId.then(id => {
          console.log('PUBLIC: uploads-start', file.id, id);
        });
      });

      this.setState({
        events: [
          ...events,
          ...payload.files.map(file => ({
            id: file.id,
            occurrenceKey: file.occurrenceKey,
          })),
        ],
      });
    });

    popup.on('upload-preview-update', this.onUploadPreviewUpdate);
    this.setState({ popup });

    popup.show();
  }

  private onUploadPreviewUpdate = async (
    event: UploadPreviewUpdateEventPayload,
  ) => {
    console.log(
      'PUBLIC: upload-preview-update',
      event.file.id,
      await event.file.upfrontId,
    );
  };

  private onCardClick = (occurrenceKey: string = '') => (event: CardEvent) => {
    if (event.mediaItemDetails) {
      this.setState({
        selectedItem: {
          id: (event.mediaItemDetails as FileDetails).id,
          occurrenceKey,
          mediaItemType: 'file',
        },
      });
    }
  };

  private renderCards = () => {
    const { events } = this.state;

    return events.map((fileRecord, key) => {
      const identifier: FileIdentifier = {
        id: fileRecord.id,
        mediaItemType: 'file',
        collectionName: defaultCollectionName,
        occurrenceKey: fileRecord.occurrenceKey,
      };

      return (
        <div key={key} style={{ display: 'inline-block', margin: '10px' }}>
          <Card
            context={context}
            identifier={identifier}
            dimensions={{
              width: 200,
              height: 200,
            }}
            onClick={this.onCardClick(identifier.occurrenceKey)}
          />
        </div>
      );
    });
  };

  private onCloseMediaViewer = () => {
    this.setState({ selectedItem: undefined });
  };

  private onDataSourceChange = (event: { value: DataSourceType }) => {
    this.setState({
      dataSourceType: event.value,
    });
  };

  private renderMediaViewer = () => {
    const { dataSourceType, selectedItem, events } = this.state;
    if (!selectedItem) {
      return null;
    }
    const list: FileIdentifier[] = events.map(event => {
      const identifier: FileIdentifier = {
        id: event.id,
        occurrenceKey: event.occurrenceKey || '',
        mediaItemType: 'file',
      };

      return identifier;
    });
    const dataSource =
      dataSourceType === 'collection'
        ? { collectionName: defaultCollectionName }
        : { list };
    return (
      <MediaViewer
        context={context}
        selectedItem={selectedItem}
        dataSource={dataSource}
        collectionName={defaultCollectionName}
        onClose={this.onCloseMediaViewer}
      />
    );
  };

  render() {
    const { popup } = this.state;

    return (
      <React.Fragment>
        <OptionsWrapper>
          <Button
            appearance="primary"
            id="show"
            onClick={() => (popup ? popup.show() : null)}
          >
            Show
          </Button>
          <SelectWrapper>
            <Select
              options={dataSourceOptions}
              defaultValue={dataSourceOptions[0]}
              onChange={this.onDataSourceChange}
            />
          </SelectWrapper>
        </OptionsWrapper>
        <div>{this.renderCards()}</div>
        {this.renderMediaViewer()}
      </React.Fragment>
    );
  }
}
