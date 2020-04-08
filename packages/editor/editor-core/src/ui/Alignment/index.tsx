import * as React from 'react';
import { PureComponent } from 'react';
import { AlignmentState } from '../../plugins/alignment/pm-plugins/types';
import { iconMap } from '../../plugins/alignment/ui/ToolbarAlignment/icon-map';
import AlignmentButton from './AlignmentButton';
import { AlignmentWrapper } from './styles';

export interface Props {
  selectedAlignment?: string;
  onClick: (value: AlignmentState) => void;
  className?: string;
}

const alignmentOptions: Array<{ title: string; value: AlignmentState }> = [
  { title: 'Align left', value: 'start' },
  { title: 'Align center', value: 'center' },
  { title: 'Align right', value: 'end' },
];

export default class Alignment extends PureComponent<Props, any> {
  render() {
    const { onClick, selectedAlignment, className } = this.props;

    return (
      <AlignmentWrapper className={className} style={{ maxWidth: 4 * 32 }}>
        {alignmentOptions.map((alignment) => {
          const { value, title } = alignment;
          return (
            <AlignmentButton
              content={iconMap[value]}
              key={value}
              value={value}
              label={title}
              onClick={onClick}
              isSelected={value === selectedAlignment}
            />
          );
        })}
      </AlignmentWrapper>
    );
  }
}
