import noop from '@atlaskit/ds-lib/noop';
import useCloseOnEscapePress from '@atlaskit/ds-lib/use-close-on-escape-press';
import FadeIn from '@atlaskit/motion/fade-in';
import { usePlatformLeafEventHandler } from '@uidu/analytics';
import Blanket from '@uidu/blanket';
import Portal from '@uidu/portal';
import React, { useCallback } from 'react';
import FocusLock from 'react-focus-lock';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import ModalDialog from './internal/components/modal-dialog';
import useModalStack from './internal/hooks/use-modal-stack';
import usePreventProgrammaticScroll from './internal/hooks/use-prevent-programmatic-scroll';
import type { ModalDialogProps } from './types';

export type { ModalDialogProps };

function ModalWrapper(props: ModalDialogProps) {
  const {
    autoFocus = true,
    shouldCloseOnEscapePress = true,
    shouldCloseOnOverlayClick = true,
    shouldScrollInViewport = false,
    stackIndex: stackIndexOverride,
    onClose = noop,
    onStackChange = noop,
    isBlanketHidden,
    testId,
    className,
    ...modalDialogProps
  } = props;

  const calculatedStackIndex = useModalStack({ onStackChange });
  const stackIndex = stackIndexOverride || calculatedStackIndex;
  const isForeground = stackIndex === 0;

  // When a user supplies a ref to focus we skip auto focus via react-focus-lock
  const autoFocusLock = typeof autoFocus === 'boolean' ? autoFocus : false;

  const onCloseHandler = usePlatformLeafEventHandler({
    fn: onClose,
    action: 'closed',
    componentName: 'modalDialog',
    packageName: process.env._PACKAGE_NAME_!,
    packageVersion: process.env._PACKAGE_VERSION_!,
  });

  const onBlanketClicked = useCallback(
    (e) => {
      if (shouldCloseOnOverlayClick) {
        onCloseHandler(e);
      }
    },
    [shouldCloseOnOverlayClick, onCloseHandler],
  );

  usePreventProgrammaticScroll();

  useCloseOnEscapePress({
    onClose: onCloseHandler,
    isDisabled: !shouldCloseOnEscapePress || !isForeground,
  });

  const modalDialogWithBlanket = (
    <Blanket
      isTinted={!isBlanketHidden}
      onBlanketClicked={onBlanketClicked}
      testId={testId && `${testId}--blanket`}
    >
      <ModalDialog
        testId={testId}
        autoFocus={autoFocus}
        stackIndex={stackIndex}
        onClose={onCloseHandler}
        shouldScrollInViewport={shouldScrollInViewport}
        className={className}
        {...modalDialogProps}
      />
    </Blanket>
  );

  return (
    <Portal zIndex={510}>
      <FadeIn>
        {(fadeInProps) => (
          <div
            {...fadeInProps}
            tw="w-screen h-screen fixed inset-0 overflow-y-auto [overflow-scroll:touch]"
            aria-hidden={!isForeground}
          >
            <FocusLock
              autoFocus={autoFocusLock}
              disabled={!isForeground}
              returnFocus
            >
              {/**
               * Ensures scroll events are blocked on the document body and locked
               * on the modal dialog.
               */}
              <ScrollLock />
              {/**
               * TouchScrollable makes the whole modal dialog scrollable when
               * scroll boundary is set to viewport.
               */}
              {shouldScrollInViewport ? (
                <TouchScrollable>{modalDialogWithBlanket}</TouchScrollable>
              ) : (
                modalDialogWithBlanket
              )}
            </FocusLock>
          </div>
        )}
      </FadeIn>
    </Portal>
  );
}

export default ModalWrapper;
