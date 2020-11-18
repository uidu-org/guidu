export default [
  'text',
  {
    props: {
      marks: {
        type: 'array',
        items: [['annotation', 'code', 'link']],
        optional: true,
      },
    },
  },
];
