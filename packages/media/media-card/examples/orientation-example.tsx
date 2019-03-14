import * as React from 'react';

import { Card } from '../src';
import * as uuid from 'uuid/v4';
import {
  mediaPickerAuthProvider,
  defaultCollectionName,
} from '@uidu/media-test-helpers';
import { ContextFactory, FileIdentifier } from '@uidu/media-core';

const context = ContextFactory.create({
  authProvider: mediaPickerAuthProvider('asap'),
});
const collection = defaultCollectionName;

interface State {
  identifier?: FileIdentifier;
}

class Example extends React.Component<{}, State> {
  state: State = {};

  onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) {
      return;
    }
    if (files.length === 0) {
      return;
    }
    const file = files.item(0);
    if (!file) {
      return;
    }
    const fileId = uuid();
    const touchedFiles = context.file.touchFiles([
      {
        fileId,
        collection,
      },
    ]);
    context.file.upload(
      {
        content: file,
        name: file.name,
        collection,
      },
      undefined,
      {
        id: fileId,
        deferredUploadId: touchedFiles.then(
          touchedFiles => touchedFiles.created[0].uploadId,
        ),
      },
    );

    this.setState({
      identifier: {
        mediaItemType: 'file',
        id: fileId,
        collectionName: collection,
      },
    });
  };

  private renderCards(identifier: FileIdentifier) {
    return (
      <table>
        <thead>
          <tr>
            <th>Resize Mode</th>
            <th>Landscapy parent</th>
            <th>Portraity parent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Fit</th>
            <td>
              <Card
                resizeMode="fit"
                context={context}
                identifier={identifier}
                dimensions={{
                  width: 200,
                  height: 100,
                }}
              />
            </td>
            <td>
              <Card
                resizeMode="fit"
                context={context}
                identifier={identifier}
                dimensions={{
                  width: 100,
                  height: 200,
                }}
              />
            </td>
          </tr>
          <tr>
            <th>Cover</th>
            <td>
              <Card
                resizeMode="crop"
                context={context}
                identifier={identifier}
                dimensions={{
                  width: 200,
                  height: 100,
                }}
              />
            </td>
            <td>
              <Card
                resizeMode="crop"
                context={context}
                identifier={identifier}
                dimensions={{
                  width: 100,
                  height: 200,
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { identifier } = this.state;

    return (
      <div>
        <h2>Choose a file</h2>
        In this example you can test how media-card handles images with
        orientation info saved in EXIF.
        <br />
        <input type="file" onChange={this.onChange} />
        {identifier ? this.renderCards(identifier) : null}
      </div>
    );
  }
}

export default () => <Example />;
