import { ButtonItem, MenuGroup } from '@uidu/menu';
import React from 'react';
import { AlignmentState } from '../../plugins/alignment/types';
import { iconMap } from '../../plugins/alignment/ui/ToolbarAlignment/icon-map';

export interface Props {
  selectedAlignment?: string;
  onClick: (value: AlignmentState) => void;
}

const alignmentOptions: Array<{ title: string; value: AlignmentState }> = [
  { title: 'Align left', value: 'start' },
  { title: 'Align center', value: 'center' },
  { title: 'Align right', value: 'end' },
];

export default function Alignment(props: Props) {
  const { onClick, selectedAlignment } = props;

  return (
    <MenuGroup>
      {alignmentOptions.map((alignment) => {
        const { value, title } = alignment;
        return (
          <ButtonItem
            key={value}
            onClick={(e) => {
              e.preventDefault();
              onClick(value);
            }}
            isSelected={value === selectedAlignment}
            iconBefore={iconMap[value]}
          >
            {title}
          </ButtonItem>
        );
      })}
    </MenuGroup>
  );
}
