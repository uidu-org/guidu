import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// https://github.com/airbnb/enzyme#installation
Enzyme.configure({ adapter: new Adapter() });

// hack around require.context not being dynamic.
// we use require.context here to grab all the files in each of the packages that have browser tests
// since require.context will walk every node in the file tree, if we try do this from the root of
// packages, it will try walk every node_modules folder, and take hours
// packages we want to add browserstack tests to will need to be added to this list like below.

const contexts = {
  'editor-core': require.context(
    '../../packages/editor/editor-core/__tests-karma__/',
    true,
    /^[^_]*.(js|jsx|ts|tsx)$/,
  ),
  'editor-test-helpers': require.context(
    '../../packages/editor/editor-test-helpers/__tests-karma__/',
    true,
    /^[^_]*.(js|jsx|ts|tsx)$/,
  ),
  'editor-common': require.context(
    '../../packages/editor/editor-common/__tests-karma__/',
    true,
    /^[^_]*.(js|jsx|ts|tsx)$/,
  ),
  'editor-confluence-transformer': require.context(
    '../../packages/editor/editor-confluence-transformer/__tests-karma__/',
    true,
    /^[^_]*.(js|jsx|ts|tsx)$/,
  ),
  'editor-mobile-bridge': require.context(
    '../../packages/editor/editor-mobile-bridge/__tests-karma__/',
    true,
    /^[^_]*.(js|jsx|ts|tsx)$/,
  ),
};

Object.keys(contexts).forEach(key => {
  const ctx = contexts[key];

  ctx.keys().forEach(path => {
    try {
      ctx(path);
    } catch (err) {
      // eslint-disable-next-line
      console.error(`Running tests in: ${path}`);
      throw err;
    }
  });
});
