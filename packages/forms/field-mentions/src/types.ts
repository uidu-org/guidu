import { FieldBaseProps } from '@uidu/field-base';
import * as React from 'react';
import { MentionItem, MentionProps, OnChangeHandlerFunc } from 'react-mentions';

export type FieldMentionsProps = FieldBaseProps &
  Omit<FieldMentionsStatelessProps, 'onChange'> & {
    /** Function to handle display. */
    // componentRef?: any;
    ref?: React.RefObject<any>;
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
  onKeyDown?: (e: any) => void;
  forwardedRef?: any;
  onChange?: OnChangeHandlerFunc;
};
