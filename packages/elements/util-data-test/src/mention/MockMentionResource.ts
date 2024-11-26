import {
  AbstractMentionResource,
  DefaultMentionNameResolver,
  MentionDescription,
  MentionNameDetails,
  MentionNameResolver,
  MentionNameStatus,
  MentionsResult,
  ResolvingMentionProvider,
  TeamMentionProvider,
} from '@uidu/mentions';
import { Search } from 'js-search';
import debug from '../logger';
import { mentionResult } from './mention-data';
import { MockMentionNameClient } from './MockMentionNameClient';
import { HttpError } from './utils';

const search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');
search.addIndex('nickname');

search.addDocuments(mentionResult);

export interface MockMentionConfig {
  minWait?: number;
  maxWait?: number;
  mentionNameResolver?: MentionNameResolver;
  enableTeamMentionHighlight?: boolean;
}

export const createMockMentionNameResolver = () => {
  return new DefaultMentionNameResolver(new MockMentionNameClient());
};

export class MockMentionResource
  extends AbstractMentionResource
  implements ResolvingMentionProvider, TeamMentionProvider
{
  private config: MockMentionConfig;
  private lastReturnedSearch: number;

  constructor(config: MockMentionConfig) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
  }

  filter(query: string): void {
    const searchTime = Date.now();
    const notify = (mentions: MentionsResult) => {
      if (searchTime >= this.lastReturnedSearch) {
        this.lastReturnedSearch = searchTime;
        let stats: { teamMentionDuration?: number; duration?: number } = {};
        if (query === 'team') {
          stats.teamMentionDuration = 200;
        } else {
          stats.duration = 100;
        }

        this._notifyListeners(mentions, stats);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
        debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
      }
      this._notifyAllResultsListeners(mentions);
    };

    const notifyErrors = (error: Error) => {
      this._notifyErrorListeners(error);
    };

    const minWait = this.config.minWait || 0;
    const randomTime = (this.config.maxWait || 0) - minWait;
    const waitTime = Math.random() * randomTime + minWait;
    setTimeout(() => {
      let mentions;
      if (query === 'error') {
        notifyErrors(new Error('mock-error'));
        return;
      } else if (query === '401' || query === '403') {
        notifyErrors(new HttpError(parseInt(query, 10), 'get off my lawn'));
        return;
      } else if (query) {
        mentions = search.search(query);
      } else {
        mentions = mentionResult;
      }
      notify({
        mentions,
        query,
      });
    }, waitTime + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  recordMentionSelection(mention: MentionDescription): void {
    debug(`Record mention selection ${mention.id}`);
  }

  resolveMentionName(
    id: string,
  ): Promise<MentionNameDetails> | MentionNameDetails {
    debug('(mock)resolveMentionName', id);
    if (!this.config.mentionNameResolver) {
      return {
        id,
        name: '',
        status: MentionNameStatus.UNKNOWN,
      };
    }
    return this.config.mentionNameResolver.lookupName(id);
  }

  cacheMentionName(id: string, name: string) {
    debug('(mock)cacheMentionName', id, name);
    if (this.config.mentionNameResolver) {
      this.config.mentionNameResolver.cacheName(id, name);
    }
  }

  supportsMentionNameResolving() {
    const supported = !!this.config.mentionNameResolver;
    debug('supportsMentionNameResolving', supported);
    return supported;
  }

  shouldHighlightMention(mention: MentionDescription): boolean {
    return mention.id === 'oscar';
  }

  mentionTypeaheadHighlightEnabled = () =>
    this.config.enableTeamMentionHighlight || false;

  mentionTypeaheadCreateTeamPath = () => '/people/search#createTeam';
}
