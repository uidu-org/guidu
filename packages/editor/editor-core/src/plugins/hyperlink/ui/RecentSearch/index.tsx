import * as React from 'react';
import RecentList, { LinkInputType } from './LinkAddToolbar';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import { DispatchAnalyticsEvent } from '../../../analytics';

export interface Props {
  providerFactory: ProviderFactory;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  onBlur?: (
    type: string,
    url: string,
    text: string,
    isTabPressed?: boolean,
  ) => void;
  onSubmit: (href: string, text: string, type?: LinkInputType) => void;
  displayText?: string | null;
  displayUrl?: string;
}

export default class HyperlinkAddToolbar extends React.PureComponent<
  Props,
  {}
> {
  render() {
    const {
      onSubmit,
      onBlur,
      displayText,
      displayUrl,
      dispatchAnalyticsEvent,
      providerFactory,
    } = this.props;
    return (
      <WithProviders
        providers={['activityProvider']}
        providerFactory={providerFactory}
        renderNode={({ activityProvider }) => (
          <RecentList
            provider={activityProvider}
            onSubmit={onSubmit}
            onBlur={onBlur}
            dispatchAnalyticsEvent={dispatchAnalyticsEvent}
            displayText={displayText || ''}
            displayUrl={displayUrl}
          />
        )}
      />
    );
  }
}
