import { Matcher, MatchResponse, Node } from 'interweave';
import React from 'react';
import { MENTION_PATTERN } from '../constants';
import Mention, { MentionProps } from './Mention';

export default class MentionMatcher extends Matcher<MentionProps> {
  replaceWith(match: string, props: MentionProps): Node {
    return React.createElement(Mention, props, match);
  }

  asTag(): string {
    return 'a';
  }

  match(
    string: string,
  ): MatchResponse<{
    display: string;
    type: string;
    id: string | number;
  }> | null {
    return this.doMatch(string, MENTION_PATTERN, matches => {
      return {
        display: matches[2],
        type: matches[3].split(':')[0],
        id: matches[3].split(':')[1],
      };
    });
  }
}
