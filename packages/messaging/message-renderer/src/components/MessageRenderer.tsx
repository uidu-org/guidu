import React, { Component } from 'react';
import Interweave from 'interweave';
import { UrlMatcher, HashtagMatcher } from 'interweave-autolink';

import Hashtag from './Hashtag';
import Url from './Url';
import MentionMatcher from './MentionMatcher';

import { MessagesRendererProps } from '../types';

export default class MessageRenderer extends Component<MessagesRendererProps> {
  static defaultProps = {
    tagName: 'div',
  };

  render() {
    const { content, tagName } = this.props;
    return (
      <Interweave
        tagName={tagName}
        content={content}
        mentionLinks={mention => [
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
