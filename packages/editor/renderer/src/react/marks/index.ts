// @ts-ignore: Props needed for inferred type declaration
import { Mark } from 'prosemirror-model';
import { ComponentType } from 'react';

import Alignment from './alignment';
import Annotation from './annotation';
import Breakout from './breakout';
import Code from './code';
import Em from './em';
import Indentation from './indentation';
import Link from './link';
import Strike from './strike';
import Strong from './strong';
import Subsup from './subsup';
import TextColor from './textColor';
import Underline from './underline';

// Stage0
import ConfluenceInlineComment from './confluence-inline-comment';

export const markToReact: { [key: string]: ComponentType<any> } = {
  code: Code,
  em: Em,
  link: Link,
  strike: Strike,
  strong: Strong,
  subsup: Subsup,
  textColor: TextColor,
  underline: Underline,
  annotation: Annotation,

  // Stage0
  confluenceInlineComment: ConfluenceInlineComment,
  breakout: Breakout,
  alignment: Alignment,
  indentation: Indentation,
};

export const toReact = (mark: Mark): ComponentType<any> =>
  markToReact[mark.type.name];

export {
  Code,
  Em,
  Link,
  Strike,
  Strong,
  Subsup,
  TextColor,
  Underline,
  Breakout,
  Annotation,
};
