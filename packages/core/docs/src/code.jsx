// @flow
import React from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stringRaw from 'string-raw';

/*
 * Tag function to render a code block, e.g. code`console.log("hello world")`
 * Template expressions aren't yet supported, and likely never will be.
 */
export default function code(
  // Tagged Template Literal support is still WIP for flow: https://github.com/facebook/flow/issues/2616
  sources: any,
  ...substitutions: any[]
) {
  let source = stringRaw(sources, substitutions);
  source = source.replace(/^(\s*\n)+/g, ''); // Remove leading newlines
  source = source.replace(/(\n\s*)+$/g, ''); // Remove trailing newlines
  return (
    <div className="my-4 mb-5">
      <SyntaxHighlighter
        language="javascript"
        style={prism}
        customStyle={{
          backgroundColor: '#f8f9fa',
          border: 0,
          marginTop: 0,
          marginBottom: 0,
          padding: '1.5rem',
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4,
        }}
      >
        {source}
      </SyntaxHighlighter>
    </div>
  );
}
