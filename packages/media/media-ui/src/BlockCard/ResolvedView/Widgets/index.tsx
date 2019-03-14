import * as React from 'react';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import Tooltip from '@uidu/tooltip';
import { ImageIcon } from '../../ImageIcon';
import { DetailViewModel, BadgeViewModel } from '../../ResolvedView';
import { Wrapper, WidgetWrapper, WidgetDetails, Title, Text } from './styled';
import { LozengeViewModel } from '../../../common';

export interface WidgetsProps {
  details?: DetailViewModel[];
}

export default class Widgets extends React.Component<WidgetsProps> {
  renderTitle(title: string): JSX.Element {
    return <Title key="title">{title}:</Title>;
  }

  renderIcon(icon: string | React.ReactNode) {
    if (typeof icon === 'string') {
      return <ImageIcon key="icon" src={icon} size={16} />;
    } else {
      return icon;
    }
  }

  renderBadge(badge: BadgeViewModel) {
    return (
      <Badge
        key="badge"
        appearance={badge.appearance || 'default'}
        value={badge.value}
        max={badge.max}
      />
    );
  }

  renderLozenge(lozenge: LozengeViewModel) {
    return (
      <Lozenge
        key="lozenge"
        appearance={lozenge.appearance || 'default'}
        isBold={lozenge.isBold}
      >
        {lozenge.text}
      </Lozenge>
    );
  }

  renderText(text: string) {
    return <Text key="text">{text}</Text>;
  }

  renderWidgetDetails(attrs: React.ReactNode[], tooltip?: string) {
    if (tooltip) {
      return (
        <Tooltip content={tooltip}>
          <WidgetDetails>{attrs}</WidgetDetails>
        </Tooltip>
      );
    } else {
      return <WidgetDetails>{attrs}</WidgetDetails>;
    }
  }

  renderWidget(key: any, detail: DetailViewModel) {
    const { title, text, icon, badge, lozenge, tooltip } = detail;

    const attrs: React.ReactNode[] = [];

    if (title) {
      attrs.push(this.renderTitle(title));
    }

    if (icon) {
      attrs.push(this.renderIcon(icon));
    }

    if (badge) {
      attrs.push(this.renderBadge(badge));
    }

    if (lozenge) {
      attrs.push(this.renderLozenge(lozenge));
    }

    if (text) {
      attrs.push(this.renderText(text));
    }

    if (attrs.length === 0) {
      // tslint:disable-next-line
      console.warn(
        `Widgets: A widget doesn't contain any supported attributes: ${JSON.stringify(
          attrs,
          null,
          2,
        )}`,
      );
      return null;
    }

    return (
      <WidgetWrapper key={key}>
        {this.renderWidgetDetails(attrs, tooltip)}
      </WidgetWrapper>
    );
  }

  render() {
    const { details = [] } = this.props;

    if (details.length === 0) {
      return null;
    }

    return (
      <Wrapper>
        {details.map((detail, index) => this.renderWidget(index, detail))}
      </Wrapper>
    );
  }
}
