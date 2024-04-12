/** @jsxImportSource @emotion/react */
import { Manager, Popper, Reference } from '@uidu/popper';
import Portal from '@uidu/portal';
import { layers } from '@uidu/theme/constants';
import React, { FC, forwardRef, memo, useState } from 'react';
import { RepositionOnUpdate } from './RepositionOnUpdate';
import { popupCSS } from './styles';
import { PopupComponentProps, PopupProps } from './types';
import { useCloseManager } from './useCloseManager';
import { useFocusManager } from './useFocusManager';

const DefaultPopupComponent = forwardRef<HTMLDivElement, PopupComponentProps>(
  (props, ref) => (
    <div
      tw="rounded block overflow-auto border border-opacity-50 shadow [background:rgb(var(--body-primary-bg))] flex-auto"
      css={popupCSS}
      ref={ref}
      {...props}
    />
  ),
);

export const Popup: FC<PopupProps> = memo(
  ({
    isOpen,
    id,
    offset,
    testId,
    content,
    trigger,
    onClose,
    boundary,
    rootBoundary = 'viewport',
    placement = 'auto',
    shouldFlip = true,
    popupComponent: PopupContainer = DefaultPopupComponent,
    zIndex = layers.spotlight(),
    autoFocus = true,
  }: PopupProps) => {
    const [popupRef, setPopupRef] = useState<HTMLDivElement | null>(null);
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
    const [initialFocusRef, setInitialFocusRef] = useState<HTMLElement | null>(
      null,
    );

    useFocusManager({ initialFocusRef, popupRef });
    useCloseManager({ isOpen, onClose, popupRef, triggerRef });

    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            trigger({
              ref: (node: HTMLElement | null) => {
                if (node) {
                  if (typeof ref === 'function') {
                    ref(node);
                  } else {
                    (ref as React.MutableRefObject<HTMLElement>).current = node;
                  }

                  setTriggerRef(node);
                }
              },
              'aria-controls': id,
              'aria-expanded': isOpen,
              'aria-haspopup': true,
            })
          }
        </Reference>
        {isOpen && (
          <Portal zIndex={zIndex}>
            <Popper
              placement={placement}
              offset={offset}
              modifiers={[
                {
                  name: 'flip',
                  enabled: shouldFlip,
                  options: {
                    rootBoundary,
                    boundary,
                  },
                },
              ]}
            >
              {({ ref, style, placement, update }) => (
                <PopupContainer
                  id={id}
                  data-placement={placement}
                  data-testid={testId}
                  ref={(node: HTMLDivElement) => {
                    if (typeof ref === 'function') {
                      ref(node);
                    } else {
                      (ref as React.MutableRefObject<HTMLElement>).current =
                        node;
                    }

                    setPopupRef(node);
                  }}
                  style={style}
                  // using tabIndex={-1} would cause a bug where Safari focuses
                  // first on the browser address bar when using keyboard
                  tabIndex={autoFocus ? 0 : undefined}
                >
                  <RepositionOnUpdate content={content} update={update}>
                    {content({
                      update,
                      isOpen,
                      onClose,
                      setInitialFocusRef,
                    })}
                  </RepositionOnUpdate>
                </PopupContainer>
              )}
            </Popper>
          </Portal>
        )}
      </Manager>
    );
  },
);

export default Popup;
