import * as React from 'react';
import { Frame } from '../Frame';
import Lozenge from '@uidu/lozenge';
import { LozengeViewModel } from '../../common';
import { IconAndTitleLayout } from '../IconAndTitleLayout';

export interface InlineCardResolvedViewProps {
  /** The optional con of the service (e.g. Dropbox/Asana/Google/etc) to display */
  icon?: string | React.ReactNode;
  /** The name of the resource */
  title: string;
  /** The the optional lozenge that might represent the statux of the resource */
  lozenge?: LozengeViewModel;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
  /** The optional url */
  link?: string;
  /** The optional click handler */
  onClick?: () => void;
}

export class InlineCardResolvedView extends React.Component<
  InlineCardResolvedViewProps
> {
  renderLozenge() {
    const { lozenge } = this.props;
    if (!lozenge) {
      return null;
    }
    return (
      <Lozenge
        appearance={lozenge.appearance || 'default'}
        isBold={lozenge.isBold}
      >
        {lozenge.text}
      </Lozenge>
    );
  }

  render() {
    const { title, isSelected, onClick, icon, link } = this.props;
    return (
      <Frame link={link} isSelected={isSelected} onClick={onClick}>
        <IconAndTitleLayout icon={icon} title={title}>
          {this.renderLozenge()}
        </IconAndTitleLayout>
      </Frame>
    );
  }
}
