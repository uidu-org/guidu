import * as React from 'react';
import { IconTitleWrapper, OtherWrapper } from './styled';
import { Icon } from '../Icon';

export interface IconAndTitleLayoutProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  right?: React.ReactNode;
}

export class IconAndTitleLayout extends React.Component<
  IconAndTitleLayoutProps
> {
  renderIcon() {
    const { icon } = this.props;
    return !icon ? null : (
      <Icon>{typeof icon === 'string' ? <img src={icon} /> : icon}</Icon>
    );
  }

  render() {
    const { icon, title, children } = this.props;
    return (
      <>
        <IconTitleWrapper hasIcon={!!icon}>
          {this.renderIcon()}
          {title}
        </IconTitleWrapper>
        {children && <OtherWrapper>{children}</OtherWrapper>}
      </>
    );
  }
}
