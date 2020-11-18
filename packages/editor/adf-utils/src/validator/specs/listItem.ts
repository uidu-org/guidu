export default {
  props: {
    type: { type: 'enum', values: ['listItem'] },
    content: { type: 'array', items: [], minItems: 1 },
  },
};
