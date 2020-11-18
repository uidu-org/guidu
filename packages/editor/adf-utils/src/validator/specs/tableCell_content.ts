export default {
  type: 'array',
  items: [
    [
      'blockCard',
      'paragraph_with_no_marks',
      'paragraph_with_alignment',
      'blockquote',
      'codeBlock_with_no_marks',
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
      'nestedExpand_with_no_marks',
      'taskList',
      {
        props: {
          type: { type: 'enum', values: ['extension'] },
          attrs: {
            props: {
              extensionKey: { type: 'string', minLength: 1 },
              extensionType: { type: 'string', minLength: 1 },
              parameters: { type: 'object', optional: true },
              text: { type: 'string', optional: true },
              layout: {
                type: 'enum',
                values: ['wide', 'full-width', 'default'],
                optional: true,
              },
            },
          },
        },
      },
    ],
  ],
  minItems: 1,
  allowUnsupportedBlock: true,
};
