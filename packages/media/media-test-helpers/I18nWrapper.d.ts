import { Component, ReactElement } from 'react';
export interface I18NWrapperState {
    locale: string;
}
export interface I18NWrapperProps {
    children: ReactElement<any>;
}
export declare class I18NWrapper extends Component<I18NWrapperProps, I18NWrapperState> {
    state: I18NWrapperState;
    onLocaleChange: (option: any) => void;
    render(): JSX.Element;
    private loadLocale;
    private getLocalTag;
}
