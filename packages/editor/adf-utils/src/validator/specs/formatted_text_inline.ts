export default [
  'text',
  {
    props: {
      marks: {
        type: 'array',
        items: [
          [
            'annotation',
            'em',
            'link',
            'strike',
            'strong',
            'subsup',
            'textColor',
            'underline',
          ],
        ],
        optional: true,
      },
    },
  },
];
