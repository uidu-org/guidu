// @flow
import { mount } from 'enzyme';
import * as React from 'react';
import ThemedCodeBlock from '../../ThemedCodeBlock';
import CodeBlock from '../../components/CodeBlock';

const code = `
  const a = 'foo';
  const b = 'bar';
  const c = [a, b].map(item => item + item);
`;

const theme = { mode: 'dark' };

describe('CodeBlock', () => {
  it('should have "text" as the default language', () => {
    expect(
      mount(<ThemedCodeBlock text={code} />)
        .find(CodeBlock)
        .prop('language'),
    ).toBe('text');
  });

  it('should have "showLineNumbers" enabled by default', () => {
    expect(
      mount(<ThemedCodeBlock text={code} />)
        .find(CodeBlock)
        .prop('showLineNumbers'),
    ).toBe(true);
  });
});
test('should apply theme', () => {
  expect(
    mount(<ThemedCodeBlock text={code} language="java" theme={theme} />)
      .find(CodeBlock)
      .prop('theme'),
  ).toBe(theme);
});
