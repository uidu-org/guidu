import * as React from 'react';
import { PureComponent } from 'react';

import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  OnToneSelected,
} from '../../types';
import EmojiButton from './EmojiButton';

export interface Props {
  emoji: EmojiDescriptionWithVariations;
  onToneSelected: OnToneSelected;
}

const extractAllTones = (
  emoji: EmojiDescriptionWithVariations,
): EmojiDescription[] => {
  if (emoji.skinVariations) {
    return [emoji, ...emoji.skinVariations];
  }
  return [emoji];
};

export class ToneSelectorInternal extends PureComponent<Props, {}> {
  public UNSAFE_componentWillMount() {}

  private onToneSelectedHandler = (skinTone: number) => {
    const { onToneSelected } = this.props;
    onToneSelected(skinTone);

    const toneList = [
      'default',
      'light',
      'mediumLight',
      'medium',
      'mediumDark',
      'dark',
    ];
  };

  render() {
    const { emoji } = this.props;
    const toneEmojis: EmojiDescription[] = extractAllTones(emoji);

    return (
      <div>
        {toneEmojis.map((tone, i) => (
          <EmojiButton
            key={`${tone.id}`}
            onSelected={() => this.onToneSelectedHandler(i)}
            emoji={tone}
            selectOnHover={true}
          />
        ))}
      </div>
    );
  }
}

export default ToneSelectorInternal;
