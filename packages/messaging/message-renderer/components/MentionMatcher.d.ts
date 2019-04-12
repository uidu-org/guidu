import { Matcher, MatchResponse, Node } from 'interweave';
import { MentionProps } from './Mention';
export default class MentionMatcher extends Matcher<MentionProps> {
    replaceWith(match: string, props: MentionProps): Node;
    asTag(): string;
    match(string: string): MatchResponse | null;
}
