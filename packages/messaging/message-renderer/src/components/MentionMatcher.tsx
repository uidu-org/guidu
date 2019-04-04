import React from 'react';
import { Matcher, MatchResponse, Node } from 'interweave';
import Mention, { MentionProps } from './Mention';
import { MENTION_PATTERN } from '../constants';

export default class MentionMatcher extends Matcher<MentionProps> {
  replaceWith(match: string, props: MentionProps): Node {
    return React.createElement(Mention, props, match);
  }

  asTag(): string {
    return 'a';
  }

  match(string: string): MatchResponse | null {
    return this.doMatch(string, MENTION_PATTERN, matches => {
      return {
        display: matches[2],
        type: matches[3].split(':')[0],
        id: matches[3].split(':')[1],
      };
    });
  }
}
