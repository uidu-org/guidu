import UiduPopup from '@uidu/popup';
import * as React from 'react';

export interface Props {
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  trigger: React.ReactElement<any>;
  isOpen?: boolean;
  onOpenChange?: (attrs: any) => void;
  fitWidth?: number;
  fitHeight?: number;
  zIndex?: number;
}

export interface State {
  target?: HTMLElement;
  popupPlacement: [string, string];
}

/**
 * Wrapper around @uidu/droplist which uses Popup and Portal to render
 * droplist outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default function Dropdown(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { trigger, children } = props;

  return (
    <UiduPopup
      trigger={(triggerProps) => (
        <div {...triggerProps} onClick={() => setIsOpen(true)}>
          {trigger}
        </div>
      )}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() => <>{children}</>}
      shouldDisableFocusTrap
    />
  );
}
