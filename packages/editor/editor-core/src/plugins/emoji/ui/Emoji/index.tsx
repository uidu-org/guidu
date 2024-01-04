import React, { PureComponent } from 'react';
import { ClickSelectWrapper } from '../../../../ui/styles';

export interface EmojiProps {
  shortName: string;
  id: string;
}

export default class EmojiNode extends PureComponent<EmojiProps, {}> {
  static displayName = 'EmojiNode';

  render() {
    const { shortName, id } = this.props;

    return (
      <ClickSelectWrapper>
        <em-emoji id={id} shortcodes={shortName} size="1rem"></em-emoji>
      </ClickSelectWrapper>
    );
  }
}
