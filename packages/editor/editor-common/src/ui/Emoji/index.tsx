import { EmojiSkin } from 'emoji-mart';
import React, { PureComponent } from 'react';

export interface EmojiProps extends EmojiSkin {
  allowTextFallback?: boolean;
  fitToHeight?: number;
}

export default class EmojiNode extends PureComponent<EmojiProps, {}> {
  render() {
    const { allowTextFallback, shortName, id, fallback, fitToHeight } =
      this.props;

    return <em-emoji shortcodes={shortName} size="1rem"></em-emoji>;

    if (allowTextFallback) {
      return <span>{fallback || shortName}</span>;
    }
  }
}
