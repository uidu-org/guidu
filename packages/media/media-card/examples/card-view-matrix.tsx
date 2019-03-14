/* tslint:disable:no-console */
import * as React from 'react';
import { atlassianLogoUrl, tallImage } from '@uidu/media-test-helpers';
import { Checkbox } from '@uidu/checkbox';
import styled from 'styled-components';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import BookIcon from '@atlaskit/icon/glyph/book';
import EditIcon from '@atlaskit/icon/glyph/edit';
import { CardAction, CardStatus, CardEvent } from '../src';
import { MediaType } from '@uidu/media-store';
import { CardView } from '../src/root/cardView';
import { FileDetails } from '@uidu/media-core';

const CardWrapper = styled.div`
  width: 150px;
  height: 150px;
`;
const CheckboxesContainer = styled.div`
  display: flex;
`;
interface State {
  disableOverlay: boolean;
  selectable: boolean;
  selected: boolean;
  hasRetry: boolean;
  withDataURI: boolean;
  hasActions: boolean;
  isExternalImage: boolean;
}

class Example extends React.Component<{}, State> {
  state: State = {
    disableOverlay: false,
    selectable: true,
    selected: false,
    hasRetry: false,
    withDataURI: true,
    hasActions: true,
    isExternalImage: false,
  };

  render() {
    const statuses: CardStatus[] = [
      'uploading',
      'loading',
      'processing',
      'complete',
      'error',
      'failed-processing',
    ];
    const mediaTypes: MediaType[] = [
      'image',
      'audio',
      'video',
      'doc',
      'unknown',
    ];

    return (
      <div style={{ margin: 10 }}>
        <CheckboxesContainer>
          <Checkbox
            value="withDataURI"
            label="Has withDataURI?"
            isChecked={this.state.withDataURI}
            onChange={this.onCheckboxChange}
            name="withDataURI"
          />
          <Checkbox
            value="disableOverlay"
            label="Disable overlay?"
            isChecked={this.state.disableOverlay}
            onChange={this.onCheckboxChange}
            name="disableOverlay"
          />
          <Checkbox
            value="selectable"
            label="Is selectable?"
            isChecked={this.state.selectable}
            onChange={this.onCheckboxChange}
            name="selectable"
          />
          <Checkbox
            value="selected"
            label="Is selected?"
            isChecked={this.state.selected}
            onChange={this.onCheckboxChange}
            name="selected"
          />
          <Checkbox
            value="hasRetry"
            label="Has retry function?"
            isChecked={this.state.hasRetry}
            onChange={this.onCheckboxChange}
            name="hasRetry"
          />
          <Checkbox
            value="hasActions"
            label="Has Actions?"
            isChecked={this.state.hasActions}
            onChange={this.onCheckboxChange}
            name="hasActions"
          />
          <Checkbox
            value="isExternalImage"
            label="Is external image?"
            isChecked={this.state.isExternalImage}
            onChange={this.onCheckboxChange}
            name="isExternalImage"
          />
        </CheckboxesContainer>
        <table style={{ width: 850 }}>
          <thead>
            <tr>
              <th key="first-column">Media Type</th>
              {statuses.map(status => (
                <th key={`${status}-column`} style={{ width: 110 }}>
                  Status: {status}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mediaTypes.map(mediaType => (
              <tr key={`${mediaType}-row`}>
                <th style={{ textAlign: 'right' }}>{mediaType}</th>
                {statuses.map(status => (
                  <td key={`${status}-entry-${mediaType}`}>
                    {this.renderCardImageView(status, mediaType)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  private onCheckboxChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    this.setState({ [value]: checked } as any);
  };

  private renderCardImageView = (
    status: CardStatus,
    mediaType: MediaType = 'image',
  ) => {
    const {
      disableOverlay,
      selectable,
      selected,
      hasRetry,
      withDataURI,
      hasActions,
      isExternalImage,
    } = this.state;
    const actions: CardAction[] = [
      {
        handler: () => console.log('clicked me'),
        icon: <DownloadIcon label="download-icon" />,
        label: 'download',
      },
      {
        handler: () => console.log('clicked me'),
        icon: <BookIcon label="book-icon" />,
        label: 'book',
      },
      {
        handler: () => console.log('clicked me'),
        icon: <EditIcon label="edit-icon" />,
        label: 'download',
      },
    ];

    const metadata: FileDetails = {
      id: 'some-id',
      name: 'hector-no-nose.jpg',
      mediaType,
      size: 4200,
    };

    let dataURI;
    if (withDataURI) {
      if (isExternalImage) {
        dataURI = atlassianLogoUrl;
      } else {
        dataURI = tallImage;
      }
    }

    return (
      <CardWrapper>
        <CardView
          status={status}
          metadata={metadata}
          mediaItemType={isExternalImage ? 'external-image' : 'file'}
          onClick={(e: CardEvent) =>
            console.log(
              'mouse click!',
              e.mediaItemDetails && (e.mediaItemDetails as FileDetails).id,
            )
          }
          onMouseEnter={(e: CardEvent) =>
            console.log(
              'mouse enter!',
              e.mediaItemDetails && (e.mediaItemDetails as FileDetails).id,
            )
          }
          resizeMode="crop"
          progress={0.5}
          disableOverlay={disableOverlay}
          selectable={selectable}
          selected={selected}
          actions={hasActions ? actions : []}
          dataURI={dataURI}
          onRetry={hasRetry ? () => console.log('retrying...') : undefined}
        />
      </CardWrapper>
    );
  };
}
export default () => <Example />;
