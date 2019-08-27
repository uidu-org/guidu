import { ReactNode } from 'react';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

export type Placement =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';

export interface Props extends WithAnalyticsEventsProps {
  /** The elements that the InlineDialog will be positioned relative to. */
  children: ReactNode;
  /** The elements to be displayed within the InlineDialog. */
  content: ReactNode;
  /** Sets whether to show or hide the dialog. */
  isOpen?: boolean;
  /** Function called when you lose focus on the object. */
  onContentBlur?: () => void;
  /** Function called when you click on the open dialog. */
  onContentClick?: () => void;
  /** Function called when you focus on the open dialog. */
  onContentFocus?: () => void;
  /** Function called when the dialog is open and a click occurs anywhere outside
   the dialog. */
  onClose?: (obj: { isOpen: boolean; event: Event }) => void;
  /** Where the dialog should appear, relative to the contents of the children. */
  placement?: Placement;
}
