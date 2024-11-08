import { ProviderFactory, WithProviders } from '@uidu/editor-common';
import React from 'react';
import HyperlinkAddToolbar from './HyperlinkAddToolbar';

export interface Props {
  providerFactory: ProviderFactory;
  onBlur?: (
    type: string,
    url: string,
    text: string,
    isTabPressed?: boolean,
  ) => void;
  onSubmit: (href: string, text: string) => void;
  displayText: string;
  displayUrl?: string;
}

export default class Toolbar extends React.PureComponent<Props, {}> {
  render() {
    const { onSubmit, onBlur, displayText, displayUrl, providerFactory } =
      this.props;
    return (
      <WithProviders
        providers={['activityProvider']}
        providerFactory={providerFactory}
        renderNode={({ activityProvider }) => (
          <HyperlinkAddToolbar
            provider={activityProvider}
            onSubmit={onSubmit}
            onBlur={onBlur}
            displayText={displayText || ''}
            displayUrl={displayUrl}
          />
        )}
      />
    );
  }
}
