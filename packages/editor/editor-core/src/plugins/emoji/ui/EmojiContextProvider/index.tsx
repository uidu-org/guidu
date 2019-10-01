import * as PropTypes from 'prop-types';
import * as React from 'react';

export class EmojiContextProvider extends React.Component<any, any> {
  static childContextTypes = {
    emoji: PropTypes.object,
  };

  getChildContext() {
    return {
      emoji: {
        emojiProvider: this.props.emojiProvider,
      },
    };
  }

  render() {
    return this.props.children;
  }
}
