import Button, { ButtonProps } from '@uidu/button';
import React, { FC, SyntheticEvent } from 'react';

export type NavigatorPropsType = {
  /** This will be passed in as aria-label to button. This is what screen reader will read */
  'aria-label'?: string;
  /** React node to render in the button, pass the text you want use to view on pagination button */
  children?: any;
  /** Is the navigator disabled */
  isDisabled?: boolean;
  /** This function is called with the when user clicks on navigator */
  onClick?: (event: SyntheticEvent) => void;
  /** Add the padding styles to the navigator
   * This can we used to add padding when displaying a icon
   */
  styles?: Object;
  component?: React.ElementType<any>;
};

const Navigator: FC<ButtonProps> = (props) => (
  <Button {...props} appearance="subtle" />
);

export default Navigator;
