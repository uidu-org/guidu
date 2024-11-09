import { MentionUserType as UserType } from '@uidu/adf-schema';
import React, { PureComponent } from 'react';
import {
  ProviderFactory,
  Providers,
  WithProviders,
} from '../../provider-factory';
import { MentionEventHandlers } from '../EventHandlers';
import MentionWithProviders from './mention-with-providers';

export interface MentionProps {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: MentionEventHandlers;
  text: string;
  accessLevel?: string;
  portal?: HTMLElement;
  userType?: UserType;
}

export interface MentionState {}

export default class Mention extends PureComponent<MentionProps, {}> {
  private providerFactory: ProviderFactory;

  constructor(props: MentionProps) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers: Providers) => {
    const { accessLevel, eventHandlers, id, portal, text } = this.props;

    const { mentionProvider } = providers;

    return (
      <MentionWithProviders
        id={id}
        text={text}
        accessLevel={accessLevel}
        eventHandlers={eventHandlers}
        mentionProvider={mentionProvider}
        portal={portal}
      />
    );
  };

  render() {
    return (
      <WithProviders
        providers={['mentionProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
