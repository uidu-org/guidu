import React from 'react';
import { Helmet } from 'react-helmet';
import CommonMark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer';
import { AkCodeBlock, AkCode } from '@atlaskit/code';
import Heading from './Markdown/Heading';
var parser = new CommonMark.Parser();
var renderer = new ReactRenderer({
  renderers: {
    CodeBlock: function CodeBlock(props) {
      return React.createElement("p", null, React.createElement(AkCodeBlock, {
        text: props.literal,
        language: props.language
      }));
    },
    Code: function Code(props) {
      return React.createElement(AkCode, {
        text: props.literal,
        language: props.language
      });
    },
    Heading: Heading
  }
});
export default function Markdown(_ref) {
  var children = _ref.children,
      description = _ref.description;
  return React.createElement("div", null, React.createElement(Helmet, null, React.createElement("meta", {
    name: "description",
    content: description
  })), renderer.render(parser.parse(children)));
}