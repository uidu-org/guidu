import { MediaNodeWithPosHandler, MediaPluginState } from '../pm-plugins/main';

export const findMediaSingleNode = (
  mediaPluginState: MediaPluginState,
  id: string,
) => {
  const { mediaNodes } = mediaPluginState;

  // Array#find... no IE support
  return mediaNodes.reduce(
    (
      memo: MediaNodeWithPosHandler | null,
      nodeWithPos: MediaNodeWithPosHandler,
    ) => {
      if (memo) {
        return memo;
      }

      const { node } = nodeWithPos;
      if (node.attrs.id === id) {
        return nodeWithPos;
      }

      return memo;
    },
    null,
  );
};

export const findMediaNode = (
  mediaPluginState: MediaPluginState,
  id: string,
  isMediaSingle: boolean,
) => {
  const mediaNodeWithPos = isMediaSingle
    ? findMediaSingleNode(mediaPluginState, id)
    : mediaPluginState.mediaGroupNodes[id];
  return mediaNodeWithPos;
};
