const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const withPreconstruct = require('@preconstruct/next');

module.exports = withPreconstruct(
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  }),
);
