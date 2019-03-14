import * as React from 'react';
import { MultiLineLayout } from '../MultiLineLayout';
import { Title, Description } from './styled';

export interface CollapsedIconTitleDescriptionLayoutProps {
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  other?: React.ReactNode;
}

export class CollapsedIconTitleDescriptionLayout extends React.Component<
  CollapsedIconTitleDescriptionLayoutProps
> {
  render() {
    const { icon, title, description, other } = this.props;
    return (
      <MultiLineLayout
        left={icon}
        middle={
          <>
            <Title>
              {title.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </Title>
            <Description>{description}</Description>
          </>
        }
        right={other}
      />
    );
  }
}
