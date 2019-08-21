import { EditorPlugin } from '../../types';
import inputRulePlugin from './pm-plugins/input-rule';
import { createPlugin } from './pm-plugins/main';

const imageUpload = (): EditorPlugin => ({
  pmPlugins() {
    return [
      {
        name: 'imageUpload',
        plugin: createPlugin,
      },
      {
        name: 'imageUploadInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
    ];
  },
});

export default imageUpload;
