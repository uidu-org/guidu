import { Plugin } from 'prosemirror-state';
import { ReactNodeView } from '../../../nodeviews';
import { PMPluginFactory } from '../../../types';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import VideoNodeView from '../nodeviews/video';
import { pluginKey } from './plugin-key';
import { VideoMeta, VideoState } from './types';
import { mapping, onSelectionChanged, reducer } from './utils';

const { createPluginState, getPluginState } = pluginFactory<
  VideoState,
  VideoMeta,
  VideoState
>(pluginKey, reducer, {
  mapping,
  onSelectionChanged,
});

const createPlugin: PMPluginFactory = (pmPluginFactoryParams) =>
  new Plugin({
    state: createPluginState(pmPluginFactoryParams.dispatch, {
      showVideoPickerAt: null,
    }),
    key: pluginKey,
    props: {
      nodeViews: {
        video: ReactNodeView.fromComponent(
          VideoNodeView,
          pmPluginFactoryParams.portalProviderAPI,
        ),
        // video: (node, view, getPos) => {
        //   console.log('node', node);
        //   console.log('view', view);
        //   console.log('getPos', getPos);
        //   console.log('pmPluginFactoryParams', pmPluginFactoryParams);

        //   return ReactNodeView.fromComponent(
        //     VideoNodeView,
        //     pmPluginFactoryParams.portalProviderAPI,
        //   );
        // },
      },
    },
  });

export { getPluginState };
export default createPlugin;
