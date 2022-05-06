import mergeRefs from '@atlaskit/ds-lib/merge-refs';
import useAutoFocus from '@atlaskit/ds-lib/use-auto-focus';
import FocusRing from '@atlaskit/focus-ring';
import FadeIn from '@atlaskit/motion/fade-in';
import React, { useId, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import type { ModalDialogProps } from '../../types';
import { ModalContext, ScrollContext } from '../context';
import useOnMotionFinish from '../hooks/use-on-motion-finish';
import { dialogHeight, dialogWidth } from '../utils';
import Positioner from './positioner';

const StyledDialog = styled.div<{ shouldScrollInViewport: boolean }>`
  ${tw`
    flex w-full max-width[100vw] h-full min-h-0 max-height[100vh] flex[1 1 auto] flex-col bg-white pointer-events-auto
    md:(width[var(--modal-dialog-width)] max-width[inherit] mx-auto rounded shadow-lg)
  `}
  ${({ shouldScrollInViewport }) => {
    if (shouldScrollInViewport) {
      return tw`
        min-height[100vh] max-height[none]
        md:(min-height[var(--modal-dialog-height)])
      `;
    }
    return tw`md:(height[var(--modal-dialog-height)] max-height[inherit])`;
  }}
`;

const dialogStyles = {
  /**
   * This is to support scrolling if the modal's children are wrapped in
   * a form.
   */
  // eslint-disable-next-line @repo/internal/styles/no-nested-styles
  '& > form:only-child': {
    display: 'inherit',
    maxHeight: 'inherit',
    flexDirection: 'inherit',
  },
};

function ModalDialog(props: ModalDialogProps) {
  const {
    width = 'medium',
    shouldScrollInViewport = false,
    autoFocus,
    stackIndex,
    onClose,
    onCloseComplete,
    onOpenComplete,
    height,
    children,
    testId,
    className,
  } = props;

  const id = useId();
  const titleId = `modal-dialog-title-${id}`;

  useAutoFocus(
    typeof autoFocus === 'object' ? autoFocus : undefined,
    // When a user supplies  a ref to focus we enable this hook
    typeof autoFocus === 'object',
  );

  const [motionRef, onMotionFinish] = useOnMotionFinish({
    onOpenComplete,
    onCloseComplete,
  });

  const modalDialogContext = useMemo(
    () => ({ testId, titleId, onClose }),
    [testId, titleId, onClose],
  );

  return (
    <Positioner
      stackIndex={stackIndex!}
      shouldScrollInViewport={shouldScrollInViewport}
      testId={testId}
      className={className}
    >
      <ModalContext.Provider value={modalDialogContext}>
        <ScrollContext.Provider value={shouldScrollInViewport}>
          <FadeIn entranceDirection="bottom" onFinish={onMotionFinish}>
            {(bottomFadeInProps) => (
              <FocusRing>
                <StyledDialog
                  {...bottomFadeInProps}
                  shouldScrollInViewport={shouldScrollInViewport}
                  ref={mergeRefs([bottomFadeInProps.ref, motionRef])}
                  css={{
                    '--modal-dialog-width': dialogWidth(width),
                    '--modal-dialog-height': dialogHeight(height),
                  }}
                  role="dialog"
                  aria-labelledby={titleId}
                  data-testid={testId}
                  data-modal-stack={stackIndex}
                  tabIndex={-1}
                  aria-modal={true}
                >
                  {children}
                </StyledDialog>
              </FocusRing>
            )}
          </FadeIn>
        </ScrollContext.Provider>
      </ModalContext.Provider>
    </Positioner>
  );
}

export default ModalDialog;
