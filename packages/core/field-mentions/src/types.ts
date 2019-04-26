import { OnChangeHandlerFunc, MentionProps, MentionItem } from 'react-mentions';

export type FieldMentionsProps = {
  /** Items to mention. */
  items: Array<MentionProps>;
  /** Function to handle display. */
  suggestionsPortalHost: Element;

  onSetValue: (value: string | {}) => void;
  onChange: (name: string, value: string | {}) => void;
  name: string;
};

export type FieldMentionsStatelessProps = {
  style?: any;
  /** Items to mention. */
  items: Array<MentionProps>;
  /** Add a classname to the button. */
  className?: string;
  value?: {
    value: string;
    plainTextValue: string;
    mentions: MentionItem[];
  };
  allowSpaceInQuery?: boolean;
  placeholder?: string;
  suggestionsPortalHost?: Element;
  onKeyDown?: () => void;
  onChange: OnChangeHandlerFunc;
};
