export default {
  props: {
    type: { type: 'enum', values: ['video'] },
    attrs: { props: { url: { type: 'string', minLength: 1 } } },
  },
};
