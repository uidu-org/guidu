import * as React from 'react';
import { Context, FileIdentifier } from '@uidu/media-core';
import { ItemViewer } from './item-viewer';
import { MediaViewerFeatureFlags } from './domain';
import { HeaderWrapper, hideControlsClassName, ListWrapper } from './styled';
import { getSelectedIndex } from './utils';
import ErrorMessage, { createError } from './error';
import { Navigation } from './navigation';
import Header from './header';

export type Props = Readonly<{
  onClose?: () => void;
  onNavigationChange?: (selectedItem: FileIdentifier) => void;
  showControls?: () => void;
  featureFlags?: MediaViewerFeatureFlags;
  defaultSelectedItem: FileIdentifier;
  items: FileIdentifier[];
  context: Context;
}>;

export type State = {
  selectedItem: FileIdentifier;
  previewCount: number;
};

export class List extends React.Component<Props, State> {
  state: State = {
    selectedItem: this.props.defaultSelectedItem,
    previewCount: 0,
  };

  render() {
    const { items } = this.props;
    return this.renderContent(items);
  }

  renderContent(items: FileIdentifier[]) {
    const { context, onClose, featureFlags, showControls } = this.props;
    const { selectedItem } = this.state;
    if (getSelectedIndex(items, selectedItem) < 0) {
      return <ErrorMessage error={createError('idNotFound')} />;
    } else {
      return (
        <ListWrapper>
          <HeaderWrapper className={hideControlsClassName}>
            <Header
              context={context}
              identifier={selectedItem}
              onClose={onClose}
            />
          </HeaderWrapper>
          <ItemViewer
            featureFlags={featureFlags}
            context={context}
            identifier={selectedItem}
            showControls={showControls}
            onClose={onClose}
            previewCount={this.state.previewCount}
          />
          <Navigation
            items={items}
            selectedItem={selectedItem}
            onChange={this.onNavigationChange}
          />
        </ListWrapper>
      );
    }
  }

  onNavigationChange = (selectedItem: FileIdentifier) => {
    const { onNavigationChange, showControls } = this.props;
    if (onNavigationChange) {
      onNavigationChange(selectedItem);
    }
    if (showControls) {
      showControls();
    }

    this.setState({ selectedItem, previewCount: this.state.previewCount + 1 });
  };
}
