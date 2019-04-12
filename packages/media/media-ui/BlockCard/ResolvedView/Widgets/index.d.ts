import * as React from 'react';
import { DetailViewModel, BadgeViewModel } from '../../ResolvedView';
import { LozengeViewModel } from '../../../common';
export interface WidgetsProps {
    details?: DetailViewModel[];
}
export default class Widgets extends React.Component<WidgetsProps> {
    renderTitle(title: string): JSX.Element;
    renderIcon(icon: string | React.ReactNode): {};
    renderBadge(badge: BadgeViewModel): JSX.Element;
    renderLozenge(lozenge: LozengeViewModel): JSX.Element;
    renderText(text: string): JSX.Element;
    renderWidgetDetails(attrs: React.ReactNode[], tooltip?: string): JSX.Element;
    renderWidget(key: any, detail: DetailViewModel): JSX.Element;
    render(): JSX.Element;
}
