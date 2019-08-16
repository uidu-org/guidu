import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { EditorState } from 'prosemirror-state';
import { removeSelectedNode } from 'prosemirror-utils';
import { IntlShape } from 'react-intl';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../../../../src/plugins/floating-toolbar/types';
import { Command, EditorAppearance } from '../../../../src/types';
import commonMessages from '../../../messages';
import { isFullPage } from '../../../utils/is-full-page';
import { hoverDecoration } from '../../base/pm-plugins/decoration';
import { MediaPluginState, stateKey } from '../pm-plugins/main';
import { renderAnnotationButton } from './annotation';
import buildLayoutButtons from './buildMediaLayoutButtons';

const remove: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(removeSelectedNode(state.tr));
  }
  return true;
};

export const floatingToolbar = (
  state: EditorState,
  intl: IntlShape,
  allowResizing?: boolean,
  allowAnnotation?: boolean,
  appearance?: EditorAppearance,
): FloatingToolbarConfig | undefined => {
  const { mediaSingle } = state.schema.nodes;
  const pluginState: MediaPluginState | undefined = stateKey.getState(state);

  if (!mediaSingle || !pluginState) {
    return undefined;
  }

  let layoutButtons: FloatingToolbarItem<Command>[] = [];
  if (isFullPage(appearance)) {
    layoutButtons = buildLayoutButtons(state, intl, allowResizing);
    if (layoutButtons.length) {
      if (allowAnnotation) {
        layoutButtons.push({
          type: 'custom',
          render: renderAnnotationButton(pluginState, intl),
        });
      }

      layoutButtons.push({ type: 'separator' });
    }
  }

  return {
    title: 'Media floating controls',
    nodeType: mediaSingle,
    getDomRef: () => pluginState.element,
    items: [
      ...layoutButtons,
      {
        type: 'button',
        appearance: 'danger',
        icon: RemoveIcon,
        onMouseEnter: hoverDecoration(mediaSingle, true),
        onMouseLeave: hoverDecoration(mediaSingle, false),
        title: intl.formatMessage(commonMessages.remove),
        onClick: remove,
      },
    ],
  };
};
