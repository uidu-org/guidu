export default {
  props: {
    type: { type: 'enum', values: ['media'] },
    attrs: [
      {
        props: {
          type: { type: 'enum', values: ['link', 'file'] },
          id: { type: 'string', minLength: 1 },
          file: {
            type: 'object',
            props: {
              id: [{ type: 'string' }, { type: 'number' }],
              storage: { type: 'string', optional: true },
              type: {
                type: 'enum',
                values: ['link', 'file', 'image', 'video', 'smart'],
              },
              metadata: {
                props: {
                  extension: { type: 'string', optional: true },
                  filename: { type: 'string', optional: true },
                  width: { type: 'number', optional: true },
                  height: { type: 'number', optional: true },
                  size: { type: 'number', optional: true },
                },
              },
              url: { type: 'string', optional: true },
            },
            required: ['id'],
          },
          height: { type: 'number', optional: true },
          width: { type: 'number', optional: true },
          occurrenceKey: { type: 'string', minLength: 1, optional: true },
          alt: { type: 'string', optional: true },
        },
      },
      {
        props: {
          type: { type: 'enum', values: ['external'] },
          url: { type: 'string' },
          alt: { type: 'string', optional: true },
          width: { type: 'number', optional: true },
          height: { type: 'number', optional: true },
        },
      },
    ],
  },
};
