import { token } from '@uidu/adf-schema';
import { EditorState } from 'prosemirror-state';
import React from 'react';
import { EditorPlugin } from '../../types';
import { typeAheadPluginKey, TypeAheadPluginState } from '../type-ahead';
import createPlugin, { getPluginState } from './pm-plugins/main';
// import { VideoState } from './pm-plugins/types';
// import VideoPicker from './ui/VideoPicker';

const tokenPlugin = (): EditorPlugin => ({
  name: 'token',

  nodes() {
    return [{ name: 'token', node: token }];
  },

  pmPlugins() {
    return [
      {
        name: 'token',
        plugin: (options) => createPlugin(options),
      },
      // {
      //   name: 'tokenKeymap',
      //   plugin: () => keymap(),
      // },
    ];
  },

  pluginsOptions: {
    // quickInsert: ({ formatMessage }) => [
    //   {
    //     title: formatMessage(messages.token),
    //     description: formatMessage(messages.tokenDescription),
    //     priority: 800,
    //     keywords: ['token', 'youtube', '/'],
    //     keyshortcut: '//',
    //     icon: () => <IconVideo label={formatMessage(messages.token)} />,
    //     action: (insert, state) => {
    //       const tr = insert('');
    //       addAnalytics(state, tr, {
    //         action: ACTION.INSERTED,
    //         actionSubject: ACTION_SUBJECT.DOCUMENT,
    //         actionSubjectId: ACTION_SUBJECT_ID.DATE,
    //         eventType: EVENT_TYPE.TRACK,
    //         attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
    //       });
    //       return tr.setMeta(tokenPluginKey, {
    //         showVideoPickerAt: tr.selection.from,
    //       });
    //     },
    //   },
    // ],
    typeAhead: {
      trigger: '{',
      // Custom regex must have a capture group around trigger
      // so it's possible to use it without needing to scan through all triggers again
      // customRegex: '\\(?(@)',
      getHighlight: (state: EditorState) => {
        const pluginState = getPluginState(state);
        console.log(pluginState);
        // const provider = pluginState.mentionProvider;
        // if (provider) {
        //   const teamMentionProvider = provider as TeamMentionProvider;
        //   if (
        //     isTeamMentionProvider(teamMentionProvider) &&
        //     teamMentionProvider.mentionTypeaheadHighlightEnabled()
        //   ) {
        //     return (
        //       <TeamMentionHighlight
        //         createTeamLink={teamMentionProvider.mentionTypeaheadCreateTeamPath()}
        //         onClose={() => TeamMentionHighlightController.registerClosed()}
        //       />
        //     );
        //   }
        // }
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

        const pluginState = getPluginState(state);

        return [
          {
            title: 'test',
            token: { id: 'test', name: 'Test ' },
            render: ({ onClick, isSelected, onHover }) => (
              <div
                onClick={onClick}
                selected={isSelected}
                onMouseEnter={onHover}
              >
                Test
              </div>
            ),
          },
        ];
        // const mentions =
        //   !prevActive && queryChanged ? [] : pluginState.mentions || [];

        // const mentionContext = {
        //   sessionId,
        // };

        // if (queryChanged && pluginState.mentionProvider) {
        //   pluginState.mentionProvider.filter(query || '', mentionContext);
        // }

        // return mentions.map(
        //   (m: MentionDescription): TypeAheadItem => ({
        //     title: m.id,
        //     render: ({ isSelected, onClick, onHover }) => (
        //       <MentionItem
        //         mention={m}
        //         selected={isSelected}
        //         onMouseEnter={onHover}
        //         onSelection={onClick}
        //       />
        //     ),
        //     mention: m,
        //   }),
        // );
      },
      selectItem(state, item, insert, { mode }) {
        console.log('selectItem', item);
        console.log('selectItem', state);
        const { schema } = state;
        // const sanitizePrivateContent =
        //   options && options.sanitizePrivateContent;
        // const mentionInsertDisplayName =
        //   options && options.mentionInsertDisplayName;
        // const { schema } = state;
        const pluginState = getPluginState(state);
        // const { mentionProvider } = pluginState;
        const { id, name } = item.token;
        console.log(pluginState);
        // const trimmedNickname =
        //   nickname && nickname.startsWith('@') ? nickname.slice(1) : nickname;
        // const renderName =
        //   mentionInsertDisplayName || !trimmedNickname ? name : trimmedNickname;
        // const typeAheadPluginState = typeAheadPluginKey.getState(
        //   state,
        // ) as TypeAheadPluginState;
        // const mentionContext = {
        //   sessionId,
        // };
        // if (mentionProvider) {
        //   mentionProvider.recordMentionSelection(item.mention, mentionContext);
        // }
        // const pickerElapsedTime = typeAheadPluginState.queryStarted
        //   ? Date.now() - typeAheadPluginState.queryStarted
        //   : 0;
        // analyticsService.trackEvent('uidu.editor-core.mention.picker.insert', {
        //   mode,
        //   isSpecial: isSpecialMention(item.mention) || false,
        //   accessLevel: accessLevel || '',
        //   mentionee: id,
        //   duration: pickerElapsedTime,
        //   queryLength: (typeAheadPluginState.query || '').length,
        // });
        // fireEvent(
        //   buildTypeAheadInsertedPayload(
        //     pickerElapsedTime,
        //     typeAheadPluginState.upKeyCount,
        //     typeAheadPluginState.downKeyCount,
        //     sessionId,
        //     mode,
        //     item.mention,
        //     pluginState.mentions,
        //     typeAheadPluginState.query || '',
        //   ),
        // );
        // sessionId = uuid();
        // if (mentionProvider && isTeamType(userType)) {
        //   TeamMentionHighlightController.registerTeamMention();
        //   return insert(
        //     buildNodesForTeamMention(
        //       schema,
        //       item.mention,
        //       mentionProvider,
        //       sanitizePrivateContent,
        //     ),
        //   );
        // }
        // // Don't insert into document if document data is sanitized.
        // const text = sanitizePrivateContent ? '' : `@${renderName}`;
        // if (
        //   sanitizePrivateContent &&
        //   isResolvingMentionProvider(mentionProvider)
        // ) {
        //   // Cache (locally) for later rendering
        //   mentionProvider.cacheMentionName(id, renderName);
        // }
        console.log('insert', insert);
        console.log('schema.nodes', schema.nodes.token);
        return insert(
          state.schema.nodes.token.createChecked({
            name,
            id,
          }),
        );
      },
      dismiss(state) {
        console.log('dismiss', state);
        const typeAheadPluginState = typeAheadPluginKey.getState(
          state,
        ) as TypeAheadPluginState;

        const pickerElapsedTime = typeAheadPluginState.queryStarted
          ? Date.now() - typeAheadPluginState.queryStarted
          : 0;

        // fireEvent(
        //   buildTypeAheadCancelPayload(
        //     pickerElapsedTime,
        //     typeAheadPluginState.upKeyCount,
        //     typeAheadPluginState.downKeyCount,
        //     sessionId,
        //     typeAheadPluginState.query || '',
        //   ),
        // );

        // sessionId = uuid();
      },
    },
  },
});

export default tokenPlugin;
