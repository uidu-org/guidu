import { EmojiAttributes } from '@uidu/adf-schema';
import { Emoji, ProviderFactory } from '@uidu/editor-common';
import * as React from 'react';
import { PureComponent } from 'react';

export interface EmojiProps extends EmojiAttributes {
  providers?: ProviderFactory;
  fitToHeight?: number;
}

export default class EmojiItem extends PureComponent<EmojiProps, {}> {
  render() {
    const { id, providers, shortName, text, fitToHeight } = this.props;

    return (
      <Emoji
        // @ts-ignore
        shortName={shortName}
        allowTextFallback={true}
        providers={providers}
        fitToHeight={fitToHeight}
      />
    );
  }
}
