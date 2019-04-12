import { Component, ReactNode } from 'react';
export declare type StoryListItem = {
    readonly title: string;
    readonly content: ReactNode;
};
export interface StoryListProps {
    readonly display?: 'row' | 'column';
    readonly children?: StoryListItem[];
}
export declare class StoryList extends Component<StoryListProps, {}> {
    render(): JSX.Element;
}
