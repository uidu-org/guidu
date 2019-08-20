import { FieldBaseProps } from '@uidu/field-base';
import { MentionItem, MentionProps, OnChangeHandlerFunc } from 'react-mentions';

export type FieldMentionsProps = FieldBaseProps & {
  /** Function to handle display. */
  componentRef?: any;
  style?: any;
  ref?: React.RefObject<any>;
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
  onKeyDown?: (e: any) => void;
};

export type FieldMentionsStatelessProps = Omit<
  FieldMentionsProps,
  'onChange'
> & {
  onChange?: OnChangeHandlerFunc;
};
