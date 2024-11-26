import { token } from '@uidu/adf-schema';
import { Token, TypeAheadItem } from '@uidu/editor-common/provider-factory';
import { ButtonItem } from '@uidu/menu';
import { EditorState } from 'prosemirror-state';
import React from 'react';
import { EditorPlugin } from '../../types';
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
    typeAhead: {
      trigger: '{',
      // Custom regex must have a capture group around trigger
      // so it's possible to use it without needing to scan through all triggers again
      // customRegex: '\\(?(@)',
      getHighlight: (state: EditorState) => {
        const pluginState = getPluginState(state);

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
      getItems: async (
        query,
        state,
        _intl,
        { prevActive, queryChanged },
        tr,
        dispatch,
      ) => {
        const pluginState = getPluginState(state);
        const { tokenProvider } = pluginState;

        const tokens = await tokenProvider.getItems(query, pluginState.tokens);

        return tokens.map(
          (t: Token): TypeAheadItem => ({
            title: t.id,
            render: ({ isSelected, onClick, onHover }) => (
              <ButtonItem
                onClick={onClick}
                isSelected={isSelected}
                onMouseEnter={onHover}
              >
                {t.name}
              </ButtonItem>
            ),
            token: t,
          }),
        );
      },
      selectItem(state, item, insert, { mode }) {
        const { schema } = state;
        const pluginState = getPluginState(state);
        const { id, name } = item.token;

        return insert(
          state.schema.nodes.token.createChecked({
            name,
            id,
          }),
        );
      },
      dismiss(state) {
        console.log('dismiss', state);
      },
    },
  },
});

export default tokenPlugin;
