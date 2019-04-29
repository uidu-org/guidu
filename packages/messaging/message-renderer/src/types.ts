export type MessagesRendererProps = {
  content: string;
  tagName: string | 'fragment';
  /** Set the button to autofocus on mount. */
  autoFocus: boolean;
  theme?: string;
};
