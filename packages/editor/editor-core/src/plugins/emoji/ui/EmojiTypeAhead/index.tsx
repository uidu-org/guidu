import { EmojiProvider } from '@atlaskit/emoji/resource';
import { EmojiTypeAhead as AkEmojiTypeAhead } from '@atlaskit/emoji/typeahead';
import {
  EmojiDescription,
  EmojiId,
  OptionalEmojiDescription,
} from '@atlaskit/emoji/types';
import { akEditorFloatingDialogZIndex, Popup } from '@uidu/editor-common';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsService } from '../../../../analytics';
import {
  getInsertTypeForKey,
  InsertType,
} from '../../../../analytics/fabric-analytics-helper';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  DispatchAnalyticsEvent,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../../../analytics';
import { EmojiState } from '../../pm-plugins/main';

export interface Props {
  editorView?: EditorView;
  pluginKey: PluginKey;
  reversePosition?: boolean;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  emojiProvider: Promise<EmojiProvider>;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  createAnalyticsEvent?: any;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  queryActive?: boolean;
  focused?: boolean;
}

export default class EmojiTypeAhead extends PureComponent<Props, State> {
  private pluginState?: EmojiState;
  private openTime: number = 0;
  private lastKeyTyped?: string;

  state: State = {};
  typeAhead?: AkEmojiTypeAhead | null;

  componentWillMount() {
    this.setPluginState(this.props);
  }

  componentWillReceiveProps(props: Props) {
    this.setPluginState(props);
  }

  componentWillUpdate(nextProps: Props) {
    if (!this.pluginState) {
      this.setPluginState(nextProps);
    }
  }

  componentWillUnmount() {
    const { pluginState } = this;

    if (pluginState) {
      pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }

  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;

    if (!editorView) {
      return;
    }

    const pluginState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;

      pluginState.subscribe(this.handlePluginStateChange);

      // note: these bindings are required otherwise 'this' context won't be available
      pluginState.onSelectPrevious = this.handleSelectPrevious;
      pluginState.onSelectNext = this.handleSelectNext;
      pluginState.onSelectCurrent = this.handleSelectCurrent;

      // note: AkEmojiTypeAhead.onClose does not work (product-fabric.atlassian.net/browse/FS-1640)
      pluginState.onDismiss = this.handleOnClose;
      pluginState.onSpaceSelectCurrent = this.handleSpaceSelectCurrent;
      pluginState.onSpaceTyped = this.handleSpaceTyped;
    }
  }

  private handlePluginStateChange = (state: EmojiState) => {
    const { anchorElement, query, queryActive, focused } = state;
    this.setState({ anchorElement, query, queryActive, focused });
  };

  handleEmojiTypeAheadRef = (ref: AkEmojiTypeAhead | null) => {
    this.typeAhead = ref;
  };

  render() {
    const { anchorElement, query, queryActive, focused } = this.state;
    const {
      popupsBoundariesElement,
      popupsMountPoint,
      popupsScrollableElement,
      emojiProvider,
      createAnalyticsEvent,
    } = this.props;

    if (
      !focused ||
      !this.pluginState ||
      !anchorElement ||
      !queryActive ||
      !emojiProvider
    ) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={350}
        fitWidth={350}
        zIndex={akEditorFloatingDialogZIndex}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
        mountTo={popupsMountPoint}
        offset={[0, 3]}
      >
        <AkEmojiTypeAhead
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onOpen={this.handleOnOpen}
          createAnalyticsEvent={createAnalyticsEvent}
          query={query}
          ref={this.handleEmojiTypeAheadRef}
        />
      </Popup>
    );
  }

  private calculateElapsedTime = () => Date.now() - this.openTime;

  private handleSelectedEmoji = (
    emojiId: EmojiId,
    emoji: OptionalEmojiDescription,
  ) => {
    const _emoji = emoji as EmojiDescription;
    const { dispatchAnalyticsEvent } = this.props;
    this.fireTypeAheadSelectedAnalytics(
      _emoji,
      this.lastKeyTyped,
      this.pluginState!.query,
    );
    if (dispatchAnalyticsEvent) {
      dispatchAnalyticsEvent({
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.EMOJI,
        attributes: { inputMethod: INPUT_METHOD.TYPEAHEAD },
        eventType: EVENT_TYPE.TRACK,
      });
    }
    this.pluginState!.insertEmoji(emojiId);
  };

  private handleSelectPrevious = (): boolean => {
    if (this.typeAhead) {
      (this.typeAhead as AkEmojiTypeAhead).selectPrevious();
      analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.keyup', {});
    }
    return true;
  };

  private handleSelectNext = (): boolean => {
    if (this.typeAhead) {
      (this.typeAhead as AkEmojiTypeAhead).selectNext();
      analyticsService.trackEvent(
        'atlassian.fabric.emoji.typeahead.keydown',
        {},
      );
    }
    return true;
  };

  private fireTypeAheadSelectedAnalytics = (
    emoji?: EmojiDescription,
    key?: string,
    query?: string,
  ): void => {
    const queryLength = (query && query.length) || 0;
    const insertType = getInsertTypeForKey(key) || InsertType.SELECTED;
    const { dispatchAnalyticsEvent } = this.props;

    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.select', {
      mode: insertType,
      duration: this.calculateElapsedTime() || 0,
      emojiId: (emoji && emoji.id) || '',
      type: (emoji && emoji.type) || '',
      queryLength,
    });
    if (insertType === InsertType.SPACE && dispatchAnalyticsEvent) {
      dispatchAnalyticsEvent({
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.EMOJI,
        attributes: { inputMethod: INPUT_METHOD.ASCII },
        eventType: EVENT_TYPE.TRACK,
      });
    }
  };

  handleSpaceTyped = (): void => {
    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.space', {});
  };

  private handleSpaceSelectCurrent = (
    emoji: EmojiDescription,
    key?: string,
    query?: string,
  ): void => {
    this.fireTypeAheadSelectedAnalytics(emoji, key, query);
  };

  private handleSelectCurrent = (key?: string): boolean => {
    this.lastKeyTyped = key;

    if (this.getEmojisCount() > 0) {
      (this.typeAhead as AkEmojiTypeAhead).chooseCurrentSelection();
    } else {
      this.pluginState!.dismiss();
    }

    return true;
  };

  private getEmojisCount(): number {
    return (this.typeAhead && this.typeAhead.count()) || 0;
  }

  handleOnOpen = (): void => {
    this.lastKeyTyped = undefined;
    this.openTime = Date.now();
    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.open', {});
  };

  handleOnClose = (): void => {
    analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.close', {});
  };
}
