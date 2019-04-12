/// <reference types="react" />
export declare type MessagesRendererProps = {
    content: string;
    tagName: keyof JSX.IntrinsicElements | 'fragment';
    /** Set the button to autofocus on mount. */
    autoFocus: boolean;
    theme?: string;
};
