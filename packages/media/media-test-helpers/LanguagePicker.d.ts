import { Component } from 'react';
export interface Props {
    locale: string;
    languages: {
        [key: string]: string;
    };
    onChange: (locale: string) => void;
}
export default class LanguagePicker extends Component<Props> {
    render(): JSX.Element;
    private handleClick;
}
