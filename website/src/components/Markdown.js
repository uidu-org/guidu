// @flow

import React, { type Node } from 'react';
import { Helmet } from 'react-helmet';
import CommonMark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer';
import { AkCodeBlock, AkCode } from '@atlaskit/code';
import Heading from './Markdown/Heading';

type Props = {
  literal: string,
  language: string,
};

const parser = new CommonMark.Parser();
const renderer = new ReactRenderer({
  renderers: {
    CodeBlock: (props: Props) => (
      <p>
        <AkCodeBlock text={props.literal} language={props.language} />
      </p>
    ),
    Code: (props: Props) => (
      <AkCode text={props.literal} language={props.language} />
    ),
    Heading,
  },
});

export default function Markdown({
  children,
  description,
}: {
  children: Node,
  description: string,
}) {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content={description || DEFAULT_META_DESCRIPTION}
        />
      </Helmet>
      {renderer.render(parser.parse(children))}
    </div>
  );
}
