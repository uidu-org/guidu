import { CreateUIAnalyticsEvent, withAnalyticsEvents } from '@uidu/analytics';
import * as React from 'react';
import { ComponentClass } from 'react';
import { EmojiProvider } from '../../api/EmojiResource';
import LoadingEmojiComponent, {
  Props as LoadingProps,
  State as LoadingState,
} from '../common/LoadingEmojiComponent';
import {
  Props as ComponentProps,
  UploadRefHandler,
} from './EmojiUploadComponent';

const emojiUploadModuleLoader = () =>
  import(
    /* webpackChunkName:"@uidu-internal_emojiUploadComponent" */ './EmojiUploadComponent'
  );

const emojiUploadLoader: () => Promise<ComponentClass<ComponentProps>> = () =>
  emojiUploadModuleLoader().then((module) => module.default);

export interface Props extends LoadingProps {
  onUploaderRef?: UploadRefHandler;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

export class EmojiUploaderInternal extends LoadingEmojiComponent<
  Props,
  LoadingState
> {
  // state initialised with static component to prevent
  // rerender when the module has already been loaded
  static AsyncLoadedComponent?: ComponentClass<ComponentProps>;
  state = {
    asyncLoadedComponent: EmojiUploaderInternal.AsyncLoadedComponent,
  };

  constructor(props: Props) {
    super(props, {});
  }

  asyncLoadComponent() {
    emojiUploadLoader().then((component) => {
      EmojiUploaderInternal.AsyncLoadedComponent = component;
      this.setAsyncState(component);
    });
  }

  renderLoaded(
    loadedEmojiProvider: EmojiProvider,
    EmojiUploadComponent: ComponentClass<ComponentProps>,
  ) {
    const { emojiProvider, ...otherProps } = this.props;
    return (
      <EmojiUploadComponent
        emojiProvider={loadedEmojiProvider}
        {...otherProps}
      />
    );
  }
}

type EmojiUploader = EmojiUploaderInternal;

const EmojiUploader = withAnalyticsEvents()(EmojiUploaderInternal);

export default EmojiUploader;
