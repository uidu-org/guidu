import { Component } from 'react';
import { FieldMentionsStatelessProps } from '../types';
export default class FieldMentionsStateless extends Component<FieldMentionsStatelessProps> {
    static defaultProps: {
        markup: string;
        placeholder: string;
        allowSpaceInQuery: boolean;
        displayTransform: (id: any, display: any) => any;
        style: {
            highlighter: {
                padding: number;
                left: number;
                overflow: string;
            };
            input: {
                margin: number;
                padding: string;
                left: number;
                border: number;
                letterSpacing: string;
                overflow: string;
            };
            suggestions: {
                list: {
                    backgroundColor: string;
                    boxShadow: string;
                };
                item: {
                    padding: string;
                    '&focused': {
                        backgroundColor: any;
                        color: any;
                    };
                };
            };
        };
    };
    render(): JSX.Element;
}
