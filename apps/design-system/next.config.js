const withMDX = require('@next/mdx')();
const withPreconstruct = require('@preconstruct/next');

module.exports = withMDX(withPreconstruct({}));
