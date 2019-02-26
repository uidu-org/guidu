import { Component, ReactNode, MouseEvent, KeyboardEvent } from 'react';

type KeyboardOrMouseEvent = MouseEvent<any> | KeyboardEvent<any>;

interface Props {
  className?: string;
  isOpen?: boolean;
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  width?: string | number | 'small' | 'medium' | 'large' | 'x-large';
  onDialogDismissed?: (event: KeyboardOrMouseEvent) => void;
}

interface State {}

export default class ModalDialog extends Component<Props, State> {}
