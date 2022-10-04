import { NodeSelection, Transaction } from 'prosemirror-state';
import { VideoMeta, VideoState } from './types';

export function reducer(pluginState: VideoState, meta: VideoMeta) {
  // ED-5033, calendar control open for element in plugin state, when node-view is clicked.
  // Following chanek ensures that if same node-view is clicked twice calendar should close,
  // but if a different node-view is clicked, calendar should open next the that node-view.
  if (meta.showVideoPickerAt === pluginState.showVideoPickerAt) {
    return { ...pluginState, showVideoPickerAt: null };
  }
  return { ...pluginState, ...meta };
}
export function mapping(tr: Transaction, pluginState: VideoState) {
  if (!pluginState.showVideoPickerAt) {
    return pluginState;
  }

  const { pos, deleted } = tr.mapping.mapResult(pluginState.showVideoPickerAt);
  return {
    showVideoPickerAt: deleted ? null : pos,
  };
}
export function onSelectionChanged(tr: Transaction, pluginState: VideoState) {
  if (
    pluginState.showVideoPickerAt &&
    !(tr.selection instanceof NodeSelection)
  ) {
    return { showVideoPickerAt: null };
  }

  return pluginState;
}
