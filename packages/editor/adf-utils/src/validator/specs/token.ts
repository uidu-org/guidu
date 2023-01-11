export default {
  props: {
    type: { type: 'enum', values: ['token'] },
    attrs: {
      props: {
        id: { type: 'string', minLength: 1 },
        name: { type: 'string', minLength: 1 },
      },
    },
  },
};
