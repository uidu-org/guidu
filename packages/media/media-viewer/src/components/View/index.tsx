import loadable from '@loadable/component';
import { FileIdentifier } from '@uidu/media-core';
import React from 'react';
import { DocViewerRenderers } from '../../renderers';

const LoadableImage = loadable(() => import('./Image'));
const LoadableVideo = loadable(() => import('./Video'));
// const LoadableFile = loadable(() => import('./File'));

export default function View({ file }: { file: FileIdentifier }) {
  const pluginRenderers = DocViewerRenderers;

  console.log('pluginRenderers', pluginRenderers);

  const matchingRenderers: DocRenderer[] = [];

  pluginRenderers?.forEach((r) => {
    if (file.type === undefined) return;
    if (r.fileTypes.indexOf(file.metadata?.mime_type) >= 0) {
      matchingRenderers.push(r);
    }
  });

  const [SelectedRenderer] = matchingRenderers.sort(
    (a, b) => b.weight - a.weight,
  );

  console.log('SelectedRenderer', SelectedRenderer);

  if (SelectedRenderer) {
    return <SelectedRenderer file={file} />;
  }

  switch (file.type) {
    case 'image':
      return <LoadableImage file={file} />;
    case 'video':
      return null;
      return <LoadableVideo file={file} />;
    // case 'file':
    //   return <LoadableFile {...this.props} />;
    default:
      return null;
  }
}
