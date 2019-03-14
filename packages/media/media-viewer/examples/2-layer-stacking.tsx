import * as React from 'react';
import Button from '@uidu/button';
import ModalDialog from '@atlaskit/modal-dialog';
import {
  createStorybookContext,
  defaultCollectionName,
} from '@uidu/media-test-helpers';
import { imageItem } from '../example-helpers';
import { MediaViewer } from '..';
import { Identifier } from '@uidu/media-core';

const context = createStorybookContext();

export type State = {
  selectedItem?: Identifier;
};

export default class Example extends React.Component<{}, State> {
  state: State = { selectedItem: undefined };
  setItem = (selectedItem: Identifier) => () => {
    this.setState({ selectedItem });
  };

  render() {
    return (
      <div>
        <ModalDialog>
          <h1>This is a modal dialog</h1>
          <p>MediaViewer should open on top of the modal dialog</p>
          <Button onClick={this.setItem(imageItem)}>Open MediaViewer</Button>
        </ModalDialog>

        {this.state.selectedItem && (
          <MediaViewer
            context={context}
            selectedItem={this.state.selectedItem}
            dataSource={{ list: [this.state.selectedItem] }}
            collectionName={defaultCollectionName}
            onClose={() => this.setState({ selectedItem: undefined })}
          />
        )}
      </div>
    );
  }
}
