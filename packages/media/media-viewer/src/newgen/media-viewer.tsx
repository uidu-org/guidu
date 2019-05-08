import {
  GasPayload,
  GasScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { withAnalyticsEvents } from '@uidu/analytics';
import {
  Context,
  FileIdentifier,
  Identifier,
  isFileIdentifier,
} from '@uidu/media-core';
import { Shortcut, theme } from '@uidu/media-ui';
import Portal from '@uidu/portal';
import * as React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { channel } from './analytics/index';
import { mediaViewerModalEvent } from './analytics/media-viewer';
import { Collection } from './collection';
import { Content } from './content';
import { ItemSource, MediaViewerFeatureFlags } from './domain';
import { List } from './list';
import { Blanket } from './styled';

export type Props = Readonly<
  {
    onClose?: () => void;
    selectedItem?: Identifier;
    featureFlags?: MediaViewerFeatureFlags;
    context: Context;
    itemSource: ItemSource;
  } & WithAnalyticsEventProps
>;

class MediaViewerComponent extends React.Component<Props, {}> {
  static contextTypes = {
    intl: intlShape,
  };

  private fireAnalytics = (payload: GasPayload | GasScreenEventPayload) => {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      const ev = createAnalyticsEvent(payload);
      ev.fire(channel);
    }
  };

  componentWillMount() {
    this.fireAnalytics(mediaViewerModalEvent());
  }

  render() {
    const { onClose } = this.props;
    const content = (
      <ThemeProvider theme={theme}>
        <Portal zIndex={1200}>
          <Blanket>
            {onClose && <Shortcut keyCode={27} handler={onClose} />}
            <Content onClose={onClose}>{this.renderContent()}</Content>
          </Blanket>
        </Portal>
      </ThemeProvider>
    );

    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  }

  private renderContent() {
    const {
      selectedItem,
      context,
      onClose,
      itemSource,
      featureFlags,
    } = this.props;
    const defaultSelectedItem =
      selectedItem && isFileIdentifier(selectedItem) ? selectedItem : undefined;

    if (itemSource.kind === 'COLLECTION') {
      return (
        <Collection
          pageSize={itemSource.pageSize}
          defaultSelectedItem={defaultSelectedItem}
          collectionName={itemSource.collectionName}
          context={context}
          onClose={onClose}
          featureFlags={featureFlags}
        />
      );
    } else if (itemSource.kind === 'ARRAY') {
      const items = itemSource.items.filter(item =>
        isFileIdentifier(item),
      ) as FileIdentifier[];
      const firstItem = items[0] as FileIdentifier;

      return (
        <List
          defaultSelectedItem={defaultSelectedItem || firstItem}
          items={items}
          context={context}
          onClose={onClose}
          featureFlags={featureFlags}
        />
      );
    } else {
      return null as never;
    }
  }
}

export const MediaViewer = withAnalyticsEvents()(MediaViewerComponent);
