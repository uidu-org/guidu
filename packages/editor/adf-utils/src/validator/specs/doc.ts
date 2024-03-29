export default {
  props: {
    version: { type: 'enum', values: [1] },
    type: { type: 'enum', values: ['doc'] },
    content: {
      type: 'array',
      items: [
        [
          'blockCard',
          'paragraph_with_no_marks',
          'paragraph_with_alignment',
          'paragraph_with_indentation',
          'blockquote',
          'codeBlock_with_no_marks',
          'codeBlock_with_marks',
          'mediaSingle',
          'orderedList',
          'bulletList',
          'decisionList',
          'heading_with_no_marks',
          'heading_with_alignment',
          'heading_with_indentation',
          'mediaGroup',
          'panel',
          'rule',
          'taskList',
          'table',
          'extension',
          'bodiedExtension',
          'expand_with_no_mark',
          'expand_with_breakout_definition',
          'video',
          'layoutSection',
        ],
      ],
      allowUnsupportedBlock: true,
    },
  },
};
