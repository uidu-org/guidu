import { annotation } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';

const annotationPlugin = (): EditorPlugin => ({
  marks() {
    return [
      {
        name: 'annotation',
        mark: annotation,
      },
    ];
  },
});

export default annotationPlugin;
