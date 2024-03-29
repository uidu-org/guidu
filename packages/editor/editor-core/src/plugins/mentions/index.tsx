import { mention } from '@uidu/adf-schema';
import { AnalyticsEventPayload } from '@uidu/analytics';
import { ProviderFactory } from '@uidu/editor-common';
import {
  ELEMENTS_CHANNEL,
  isResolvingMentionProvider,
  isSpecialMention,
  MentionDescription,
  MentionItem,
  MentionProvider,
  TeamMember,
  TeamMentionHighlight,
  TeamMentionHighlightController,
  TeamMentionProvider,
} from '@uidu/mentions';
import { Fragment, Node, Schema } from 'prosemirror-model';
import { EditorState, Plugin, PluginKey, StateField } from 'prosemirror-state';
import React from 'react';
import { v1 as uuid } from 'uuid';
import { analyticsService } from '../../analytics';
import { Dispatch } from '../../event-dispatcher';
import { Command, EditorPlugin } from '../../types';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import WithPluginState from '../../ui/WithPluginState';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconMention } from '../quick-insert/assets';
import {
  createInitialPluginState,
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from '../type-ahead/pm-plugins/main';
import { TypeAheadItem } from '../type-ahead/types';
import {
  buildTypeAheadCancelPayload,
  buildTypeAheadInsertedPayload,
  buildTypeAheadRenderedPayload,
} from './analytics';
import mentionNodeView from './nodeviews/mention';
import {
  MentionPluginOptions,
  MentionPluginState,
  TeamInfoAttrAnalytics,
} from './types';
import ToolbarMention from './ui/ToolbarMention';
import { isTeamStats, isTeamType } from './utils';

const mentionsPlugin = (options?: MentionPluginOptions): EditorPlugin => {
  let sessionId = uuid();
  const fireEvent = <T extends AnalyticsEventPayload>(payload: T): void => {
    if (options && options.createAnalyticsEvent) {
      if (payload.attributes && !payload.attributes.sessionId) {
        payload.attributes.sessionId = sessionId;
      }
      options.createAnalyticsEvent(payload).fire(ELEMENTS_CHANNEL);
    }
  };

  return {
    name: 'mention',

    nodes() {
      return [{ name: 'mention', node: mention }];
    },

    pmPlugins() {
      return [
        {
          name: 'mention',
          plugin: ({ providerFactory, dispatch, portalProviderAPI }) =>
            mentionPluginFactory(
              dispatch,
              providerFactory,
              portalProviderAPI,
              fireEvent,
              options,
            ),
        },
      ];
    },

    secondaryToolbarComponent({ editorView, disabled }) {
      return (
        <WithPluginState
          editorView={editorView}
          plugins={{
            typeAheadState: typeAheadPluginKey,
            mentionState: mentionPluginKey,
          }}
          render={({
            typeAheadState = createInitialPluginState(),
            mentionState = {},
          }: {
            typeAheadState: TypeAheadPluginState;
            mentionState: MentionPluginState;
          }) =>
            !mentionState.mentionProvider ? null : (
              <ToolbarMention
                editorView={editorView}
                isDisabled={disabled || !typeAheadState.isAllowed}
              />
            )
          }
        />
      );
    },

    pluginsOptions: {
      quickInsert: ({ formatMessage }) => [
        {
          title: formatMessage(messages.mention),
          description: formatMessage(messages.mentionDescription),
          priority: 400,
          keyshortcut: '@',
          icon: () => <IconMention label={formatMessage(messages.mention)} />,
          action(insert, state) {
            const mark = state.schema.mark('typeAheadQuery', {
              trigger: '@',
            });
            const mentionText = state.schema.text('@', [mark]);
            const tr = insert(mentionText);
            return addAnalytics(state, tr, {
              action: ACTION.INVOKED,
              actionSubject: ACTION_SUBJECT.TYPEAHEAD,
              actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.UI,
            });
          },
        },
      ],
      typeAhead: {
        trigger: '@',
        // Custom regex must have a capture group around trigger
        // so it's possible to use it without needing to scan through all triggers again
        customRegex: '\\(?(@)',
        getHighlight: (state: EditorState) => {
          const pluginState = getMentionPluginState(state);
          const provider = pluginState.mentionProvider;
          if (provider) {
            const teamMentionProvider = provider as TeamMentionProvider;
            if (
              isTeamMentionProvider(teamMentionProvider) &&
              teamMentionProvider.mentionTypeaheadHighlightEnabled()
            ) {
              return (
                <TeamMentionHighlight
                  createTeamLink={teamMentionProvider.mentionTypeaheadCreateTeamPath()}
                  onClose={() =>
                    TeamMentionHighlightController.registerClosed()
                  }
                />
              );
            }
          }
          return null;
        },
        getItems(
          query,
          state,
          _intl,
          { prevActive, queryChanged },
          tr,
          dispatch,
        ) {
          // if (!prevActive && queryChanged) {
          //   analyticsService.trackEvent(
          //     'uidu.editor-core.mention.picker.trigger.shortcut',
          //   );
          //   if (!tr.getMeta(analyticsPluginKey)) {
          //     (dispatch as AnalyticsDispatch)(analyticsEventKey, {
          //       payload: {
          //         action: ACTION.INVOKED,
          //         actionSubject: ACTION_SUBJECT.TYPEAHEAD,
          //         actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
          //         attributes: { inputMethod: INPUT_METHOD.KEYBOARD },
          //         eventType: EVENT_TYPE.UI,
          //       },
          //     });
          //   }
          // }

          const pluginState = getMentionPluginState(state);
          const mentions =
            !prevActive && queryChanged ? [] : pluginState.mentions || [];

          const mentionContext = {
            sessionId,
          };

          if (queryChanged && pluginState.mentionProvider) {
            pluginState.mentionProvider.filter(query || '', mentionContext);
          }

          return mentions.map(
            (m: MentionDescription): TypeAheadItem => ({
              title: m.id,
              render: ({ isSelected, onClick, onHover }) => (
                <MentionItem
                  mention={m}
                  selected={isSelected}
                  onMouseEnter={onHover}
                  onSelection={onClick}
                />
              ),
              mention: m,
            }),
          );
        },
        selectItem(state, item, insert, { mode }) {
          const sanitizePrivateContent =
            options && options.sanitizePrivateContent;
          const mentionInsertDisplayName =
            options && options.mentionInsertDisplayName;

          const { schema } = state;

          const pluginState = getMentionPluginState(state);
          console.log('pluginState', pluginState);
          const { mentionProvider } = pluginState;
          const { id, name, nickname, accessLevel, userType } = item.mention;
          const trimmedNickname =
            nickname && nickname.startsWith('@') ? nickname.slice(1) : nickname;
          const renderName =
            mentionInsertDisplayName || !trimmedNickname
              ? name
              : trimmedNickname;
          const typeAheadPluginState = typeAheadPluginKey.getState(
            state,
          ) as TypeAheadPluginState;

          const mentionContext = {
            sessionId,
          };
          if (mentionProvider) {
            mentionProvider.recordMentionSelection(
              item.mention,
              mentionContext,
            );
          }

          const pickerElapsedTime = typeAheadPluginState.queryStarted
            ? Date.now() - typeAheadPluginState.queryStarted
            : 0;

          analyticsService.trackEvent(
            'uidu.editor-core.mention.picker.insert',
            {
              mode,
              isSpecial: isSpecialMention(item.mention) || false,
              accessLevel: accessLevel || '',
              mentionee: id,
              duration: pickerElapsedTime,
              queryLength: (typeAheadPluginState.query || '').length,
            },
          );

          fireEvent(
            buildTypeAheadInsertedPayload(
              pickerElapsedTime,
              typeAheadPluginState.upKeyCount,
              typeAheadPluginState.downKeyCount,
              sessionId,
              mode,
              item.mention,
              pluginState.mentions,
              typeAheadPluginState.query || '',
            ),
          );

          sessionId = uuid();

          if (mentionProvider && isTeamType(userType)) {
            TeamMentionHighlightController.registerTeamMention();

            return insert(
              buildNodesForTeamMention(
                schema,
                item.mention,
                mentionProvider,
                sanitizePrivateContent,
              ),
            );
          }

          // Don't insert into document if document data is sanitized.
          const text = sanitizePrivateContent ? '' : `@${renderName}`;

          if (
            sanitizePrivateContent &&
            isResolvingMentionProvider(mentionProvider)
          ) {
            // Cache (locally) for later rendering
            mentionProvider.cacheMentionName(id, renderName);
          }

          return insert(
            schema.nodes.mention.createChecked({
              text,
              id,
              accessLevel,
              userType: userType === 'DEFAULT' ? null : userType,
            }),
          );
        },
        dismiss(state) {
          const typeAheadPluginState = typeAheadPluginKey.getState(
            state,
          ) as TypeAheadPluginState;

          const pickerElapsedTime = typeAheadPluginState.queryStarted
            ? Date.now() - typeAheadPluginState.queryStarted
            : 0;

          fireEvent(
            buildTypeAheadCancelPayload(
              pickerElapsedTime,
              typeAheadPluginState.upKeyCount,
              typeAheadPluginState.downKeyCount,
              sessionId,
              typeAheadPluginState.query || '',
            ),
          );

          sessionId = uuid();
        },
      },
    },
  };
};

export default mentionsPlugin;

/**
 * Actions
 */

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS',
  SET_CONTEXT: 'SET_CONTEXT',
};

export const setProvider =
  (provider: MentionProvider | undefined): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(mentionPluginKey, {
          action: ACTIONS.SET_PROVIDER,
          params: { provider },
        }),
      );
    }
    return true;
  };

export const setResults =
  (results: MentionDescription[]): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(mentionPluginKey, {
          action: ACTIONS.SET_RESULTS,
          params: { results },
        }),
      );
    }
    return true;
  };

/**
 *
 * ProseMirror Plugin
 *
 */

export const mentionPluginKey = new PluginKey('mentionPlugin');

export function getMentionPluginState(state: EditorState) {
  return mentionPluginKey.getState(state) as MentionPluginState;
}

function mentionPluginFactory(
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  portalProviderAPI: PortalProviderAPI,
  fireEvent: (payload: any) => void,
  options?: MentionPluginOptions,
) {
  let mentionProvider: MentionProvider;

  // const sendAnalytics = (
  //   event: string,
  //   actionSubject: string,
  //   action: string,
  // ): void => {
  //   if (event === SLI_EVENT_TYPE) {
  //     fireEvent(buildSliPayload(actionSubject, action));
  //   }
  // };

  return new Plugin({
    key: mentionPluginKey,
    state: {
      init() {
        return {};
      },
      apply(tr, pluginState) {
        const { action, params } = tr.getMeta(mentionPluginKey) || {
          action: null,
          params: null,
        };

        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = {
              ...pluginState,
              mentionProvider: params.provider,
            };
            dispatch(mentionPluginKey, newPluginState);

            return newPluginState;

          case ACTIONS.SET_RESULTS:
            newPluginState = {
              ...pluginState,
              mentions: params.results,
            };
            dispatch(mentionPluginKey, newPluginState);
            return newPluginState;
        }

        return newPluginState;
      },
    } as StateField<MentionPluginState>,
    props: {
      nodeViews: {
        mention: mentionNodeView(portalProviderAPI, providerFactory, options),
      },
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<MentionProvider>,
      ) => {
        switch (name) {
          case 'mentionProvider':
            if (!providerPromise) {
              return setProvider(undefined)(
                editorView.state,
                editorView.dispatch,
              );
            }

            (providerPromise as Promise<MentionProvider>)
              .then((provider) => {
                if (mentionProvider) {
                  mentionProvider.unsubscribe('mentionPlugin');
                }

                mentionProvider = provider;
                setProvider(provider)(editorView.state, editorView.dispatch);

                provider.subscribe(
                  'mentionPlugin',
                  (mentions, query, stats) => {
                    setResults(mentions)(editorView.state, editorView.dispatch);

                    let duration: number = 0;
                    let userIds: string[] | null = null;
                    let teams: TeamInfoAttrAnalytics[] | null = null;

                    if (!isTeamStats(stats)) {
                      // is from user mention
                      duration = stats && stats.duration;
                      teams = null;
                      userIds = mentions
                        .map((mention) =>
                          isTeamType(mention.userType) ? null : mention.id,
                        )
                        .filter((m) => !!m) as string[];
                    } else {
                      // is from team mention
                      duration = stats && stats.teamMentionDuration;
                      userIds = null;
                      teams = mentions
                        .map((mention) =>
                          isTeamType(mention.userType)
                            ? {
                                teamId: mention.id,
                                includesYou: mention.context!.includesYou,
                                memberCount: mention.context!.memberCount,
                              }
                            : null,
                        )
                        .filter((m) => !!m) as TeamInfoAttrAnalytics[];
                    }

                    const payload = buildTypeAheadRenderedPayload(
                      duration,
                      userIds,
                      query || '',
                      teams,
                    );
                    fireEvent(payload);
                  },
                  // undefined,
                  // undefined,
                  // undefined,
                  // sendAnalytics,
                );
              })
              .catch(() =>
                setProvider(undefined)(editorView.state, editorView.dispatch),
              );
            break;
        }
        return undefined;
      };

      providerFactory.subscribe('mentionProvider', providerHandler);

      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('mentionProvider', providerHandler);
          }
          if (mentionProvider) {
            mentionProvider.unsubscribe('mentionPlugin');
          }
        },
      };
    },
  });
}

/**
 * When a team mention is selected, we render a team link and list of member/user mentions
 * in editor content
 */
function buildNodesForTeamMention(
  schema: Schema,
  selectedMention: MentionDescription,
  mentionProvider: MentionProvider,
  sanitizePrivateContent?: boolean,
): Fragment {
  const { nodes, marks } = schema;
  const { name, id: teamId, accessLevel, context } = selectedMention;

  // build team link
  const defaultTeamLink = `${window.location.origin}/people/team/${teamId}`;
  const teamLink =
    context && context.teamLink ? context.teamLink : defaultTeamLink;
  const teamLinkNode = schema.text(name!, [
    marks.link.create({ href: teamLink }),
  ]);

  const openBracketText = schema.text('(');
  const closeBracketText = schema.text(')');
  const emptySpaceText = schema.text(' ');

  const inlineNodes: Node[] = [teamLinkNode, emptySpaceText, openBracketText];

  const members: TeamMember[] =
    context && context.members ? context.members : [];
  members.forEach((member: TeamMember, index) => {
    const { name, id } = member;
    const mentionName = `@${name}`;
    const text = sanitizePrivateContent ? '' : mentionName;
    if (sanitizePrivateContent && isResolvingMentionProvider(mentionProvider)) {
      mentionProvider.cacheMentionName(id, name);
    }
    const userMentionNode = nodes.mention.createChecked({
      text,
      id: member.id,
      accessLevel,
      userType: 'DEFAULT',
    });

    inlineNodes.push(userMentionNode);
    // should not add empty space after the last user mention.
    if (index !== members.length - 1) {
      inlineNodes.push(emptySpaceText);
    }
  });

  inlineNodes.push(closeBracketText);
  return Fragment.fromArray(inlineNodes);
}

const isTeamMentionProvider = (p: any): p is TeamMentionProvider =>
  !!(
    (p as TeamMentionProvider).mentionTypeaheadHighlightEnabled &&
    (p as TeamMentionProvider).mentionTypeaheadCreateTeamPath
  );
