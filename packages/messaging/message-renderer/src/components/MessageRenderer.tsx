import { Interweave } from 'interweave';
import { HashtagMatcher, UrlMatcher } from 'interweave-autolink';
import React, { PureComponent } from 'react';
import { MessagesRendererProps } from '../types';
import Hashtag from './Hashtag';
import MentionMatcher from './MentionMatcher';
import Url from './Url';

export default class MessageRenderer extends PureComponent<MessagesRendererProps> {
  static defaultProps = {
    tagName: 'div',
  };

  render() {
    const { content, tagName } = this.props;
    return (
      <Interweave
        tagName={tagName}
        content={content}
        mentionLinks={(mention) => [
          {
            name: 'View profile',
            link: `/${mention.id}`,
          },
        ]}
        matchers={[
          new UrlMatcher('url', {}, Url),
          new HashtagMatcher('hashtag', {}, Hashtag),
          new MentionMatcher('mention', {}),
        ]}
      />
    );
  }
}
