import * as React from 'react';
import { getEmojis, onToneSelected } from '../examples-utils';
import ToneSelector from '../src/components/common/ToneSelector';
import filters from '../src/util/filters';

const toneEmoji = filters.toneEmoji(getEmojis());

export default function Example() {
  return <ToneSelector emoji={toneEmoji} onToneSelected={onToneSelected} />;
}
