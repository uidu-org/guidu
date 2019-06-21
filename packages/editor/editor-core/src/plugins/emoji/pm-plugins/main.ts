import { ProviderFactory } from '@atlaskit/editor-common';
import { EmojiProvider } from '@atlaskit/emoji/resource';
import {
  EmojiDescription,
  EmojiId,
  EmojiSearchResult,
} from '@atlaskit/emoji/types';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import { EditorAppearance } from '../../../types';
import {
  isChromeWithSelectionBug,
  isMarkTypeAllowedInCurrentSelection,
} from '../../../utils';
import emojiNodeView from '../nodeviews/emoji';

export const emojiPluginKey = new PluginKey('emojiPlugin');
export type StateChangeHandler = (state: EmojiState) => any;
export type ProviderChangeHandler = (provider?: EmojiProvider) => any;

export interface Options {
  emojiProvider: Promise<EmojiProvider>;
}

export class EmojiState {
  emojiProvider?: EmojiProvider;
  query?: string;
  enabled: boolean = true;
  focused: boolean = false;
  queryActive: boolean = false;
  anchorElement?: HTMLElement;

  onSelectPrevious = (): boolean => false;
  onSelectNext = (): boolean => false;
  onSelectCurrent = (_key?: string): boolean => false;
  onSpaceSelectCurrent = (
    _emoji: EmojiDescription,
    _key?: string,
    _query?: string,
  ): void => {};
  onSpaceTyped = (): void => {};
  onDismiss = (): void => {};

  private changeHandlers: StateChangeHandler[] = [];
  private view!: EditorView;
  private queryResult: EmojiDescription[] = [];

  constructor(providerFactory: ProviderFactory) {
    this.changeHandlers = [];
    providerFactory.subscribe('emojiProvider', this.handleProvider);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifySubscribers() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  update(state: EditorState) {
    if (!this.emojiProvider) {
      return undefined;
    }

    const { emojiQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    let dirty = false;

    const newEnabled = this.isEnabled();
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      dirty = true;
    }

    if (doc.rangeHasMark(from - 1, to, emojiQuery)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore /*nodeAfter*/ } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent) || '';

      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;
      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return undefined;
    }

    if (this.queryActive) {
      const newAnchorElement = this.view.dom.querySelector(
        'span[data-emoji-query]',
      ) as HTMLElement;
      if (newAnchorElement !== this.anchorElement) {
        dirty = true;
        this.anchorElement = newAnchorElement;
      }
    }

    if (dirty) {
      this.notifySubscribers();
    }
  }

  dismiss(): boolean {
    this.queryActive = false;
    this.query = undefined;

    const { view } = this;
    const { state } = view;

    if (state) {
      const { schema } = state;
      const { tr } = state;
      const markType = schema.mark('emojiQuery');

      view.dispatch(
        tr
          .removeMark(0, state.doc.nodeSize - 2, markType)
          .removeStoredMark(markType),
      );
    }
    this.notifySubscribers();
    this.onDismiss();
    return true;
  }

  isEnabled() {
    const { schema } = this.view.state;
    const { emojiQuery } = schema.marks;
    return isMarkTypeAllowedInCurrentSelection(emojiQuery, this.view.state);
  }

  private findEmojiQueryMark() {
    const { state } = this.view;
    const { doc, schema, selection } = state;
    const { to, from } = selection;
    const { emojiQuery } = schema.marks;

    let start = from;
    let node = doc.nodeAt(start);

    while (start > 0 && (!node || !emojiQuery.isInSet(node.marks))) {
      start--;
      node = doc.nodeAt(start);
    }

    let end = start;

    if (node && emojiQuery.isInSet(node.marks)) {
      const resolvedPos = doc.resolve(start);
      // -1 is to include : in replacement
      // resolvedPos.depth + 1 to make emoji work inside other blocks e.g. "list item" or "blockquote"
      start = resolvedPos.start(resolvedPos.depth + 1) - 1;
      end = start + node.nodeSize;
    }

    // Emoji inserted via picker
    if (start === 0 && end === 0) {
      start = from;
      end = to;
    }

    return { start, end };
  }

  insertEmoji = (emojiId?: EmojiId) => {
    const { view } = this;
    const { state } = view;
    const { emoji } = state.schema.nodes;

    if (emoji && emojiId) {
      const { start, end } = this.findEmojiQueryMark();
      const node = emoji.create({
        ...emojiId,
        text: emojiId.fallback || emojiId.shortName,
      });
      const textNode = state.schema.text(' ');

      // This problem affects Chrome v58-62. See: https://github.com/ProseMirror/prosemirror/issues/710
      if (isChromeWithSelectionBug) {
        const selection = document.getSelection();
        if (selection) {
          selection.empty();
        }
      }

      view.dispatch(state.tr.replaceWith(start, end, [node, textNode]));
      view.focus();
      this.queryActive = false;
      this.query = undefined;
    } else {
      this.dismiss();
    }
  };

  handleProvider = (name: string, provider: Promise<any> | undefined): void => {
    if (!provider) {
      return undefined;
    }

    switch (name) {
      case 'emojiProvider':
        provider
          .then((emojiProvider: EmojiProvider) => {
            this.emojiProvider = emojiProvider;
            if (this.emojiProvider) {
              this.emojiProvider.subscribe(this.onProviderChange);
            }
          })
          .catch(() => {
            if (this.emojiProvider) {
              this.emojiProvider.unsubscribe(this.onProviderChange);
            }
            this.emojiProvider = undefined;
          });
        break;
    }
  };

  trySelectCurrentWithSpace = (key?: string): boolean => {
    const emojisCount = this.getEmojisCount();
    if (emojisCount === 1) {
      const lastQuery = this.query;
      this.insertEmoji(this.queryResult[0]);
      this.onSpaceSelectCurrent(this.queryResult[0], key, lastQuery);
      return true;
    } else if (emojisCount === 0 || this.isEmptyQuery()) {
      this.dismiss();
    }
    this.onSpaceTyped();
    return false;
  };

  updateEditorFocused(focused: boolean) {
    this.focused = focused;
    this.notifySubscribers();
  }

  private getEmojisCount = (): number => {
    return (this.queryResult && this.queryResult.length) || 0;
  };

  private isEmptyQuery = (): boolean => {
    return !this.query || this.query === ':';
  };

  onSearchResult = (searchResults: EmojiSearchResult): void => {
    this.queryResult = searchResults.emojis;
  };

  private onProviderChange = {
    result: this.onSearchResult,
  };

  setView(view: EditorView) {
    this.view = view;
  }
}

export function createPlugin(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  editorAppearance?: EditorAppearance,
) {
  return new Plugin({
    state: {
      init(_config, state) {
        return new EmojiState(providerFactory);
      },
      apply(_tr, pluginState, _oldState, _newState) {
        // NOTE: Don't call pluginState.update here.
        return pluginState;
      },
    },
    props: {
      nodeViews: {
        emoji: emojiNodeView(
          portalProviderAPI,
          providerFactory,
          editorAppearance,
        ),
      },
      handleDOMEvents: {
        focus(view: EditorView, _event) {
          emojiPluginKey.getState(view.state).updateEditorFocused(true);
          return false;
        },
        blur(view: EditorView, _event) {
          emojiPluginKey.getState(view.state).updateEditorFocused(false);
          return false;
        },
      },
    },
    key: emojiPluginKey,
    view: (view: EditorView) => {
      const pluginState: EmojiState = emojiPluginKey.getState(view.state);
      pluginState.setView(view);

      return {
        update(view: EditorView, _prevState: EditorState) {
          const pluginState: EmojiState = emojiPluginKey.getState(view.state);
          pluginState.setView(view);
          pluginState.update(view.state);
        },
        destroy() {
          providerFactory.unsubscribe(
            'emojiProvider',
            pluginState.handleProvider,
          );
        },
      };
    },
  });
}
