import { FileIdentifier } from '@uidu/media-core';
import React from 'react';
import { DocViewerRenderers } from '../../renderers';
import { DocRenderer } from '../../renderers/types';
import { MediaViewerProps } from '../../types';

// const LoadableImage = loadable(() => import('./Image'));
// const LoadableVideo = loadable(() => import('./Video'));
// const LoadableFile = loadable(() => import('./File'));

export default function View({
  file,
  config,
}: {
  file: FileIdentifier;
  config: MediaViewerProps['config'];
}) {
  const pluginRenderers = DocViewerRenderers;

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

  if (SelectedRenderer) {
    return <SelectedRenderer file={file} {...config} />;
  }

  return null;
}
