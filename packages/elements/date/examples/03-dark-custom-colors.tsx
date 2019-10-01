import * as React from 'react';
// @ts-ignore
import { AtlaskitThemeProvider } from '@uidu/theme';
import { Date, Color } from '../src';

const DateInParagraph = ({ color }: { color?: Color }) => (
  <p>
    <Date value={586137600000} color={color} />
  </p>
);

export default () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <DateInParagraph />
    <DateInParagraph color="red" />
    <DateInParagraph color="green" />
    <DateInParagraph color="blue" />
    <DateInParagraph color="purple" />
    <DateInParagraph color="yellow" />
  </AtlaskitThemeProvider>
);
