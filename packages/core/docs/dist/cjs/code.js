import React from 'react';
import stringRaw from 'string-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles/prism';
/*
 * Tag function to render a code block, e.g. code`console.log("hello world")`
 * Template expressions aren't yet supported, and likely never will be.
 */

export default function code( // Tagged Template Literal support is still WIP for flow: https://github.com/facebook/flow/issues/2616
sources, ...substitutions) {
  let source = stringRaw(sources, substitutions);
  source = source.replace(/^(\s*\n)+/g, ''); // Remove leading newlines

  source = source.replace(/(\n\s*)+$/g, ''); // Remove trailing newlines

  return React.createElement("div", {
    className: "my-3"
  }, React.createElement(SyntaxHighlighter, {
    language: "javascript",
    style: tomorrow
  }, source));
}