import * as React from 'react';
import { renderHighlight } from '../MentionItem/MentionHighlightHelpers';
import { DescriptionBylineStyle } from './styles';
import { DescriptionBylineProps } from './types';

export default class UserMentionDescriptionByline extends React.PureComponent<
  DescriptionBylineProps,
  {}
> {
  render() {
    const { highlight, name, nickname } = this.props.mention;
    const nicknameHighlights = highlight && highlight.nickname;

    if (name === nickname) {
      return null;
    }

    return renderHighlight(
      DescriptionBylineStyle as any,
      nickname,
      nicknameHighlights,
      '@',
    );
  }
}
