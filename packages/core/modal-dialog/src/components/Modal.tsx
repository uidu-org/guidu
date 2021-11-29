import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import Blanket from '@uidu/blanket';
import { canUseDOM } from 'exenv';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WidthNames, WIDTH_ENUM } from '../shared-variables';
import { Dialog, FillScreen as StyledFillScreen } from '../styled/Modal';
import pkg from '../version.json';
import { Animation } from './Animation';
import Content from './Content';
import FocusLock from './FocusLock';
import { WrapperProps as OuterProps } from './ModalWrapper';
import Positioner from './Positioner';

function getScrollDistance() {
  return (
    window.pageYOffset ||
    (document.documentElement && document.documentElement.scrollTop) ||
    (document.body && document.body.scrollTop) ||
    0
  );
}

interface Props extends OuterProps {
  /**
    Whether or not the dialog is visible
  */
  isOpen: boolean;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;
}

const _getScrollbarWidth = () => {
  // thx d.walsh
  const scrollDiv = document.createElement('div');
  // scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth =
    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

function Modal({
  autoFocus = true,
  scrollBehavior = 'inside' as 'inside' | 'outside',
  shouldCloseOnEscapePress = true,
  shouldCloseOnOverlayClick = true,
  isChromeless = false,
  isOpen = true,
  stackIndex = 0,
  width = 'medium' as WidthNames,
  isHeadingMultiline = true,
  onClose = () => {},
  actions,
  appearance,
  body,
  children,
  components,
  footer,
  header,
  height,
  onCloseComplete,
  onOpenComplete,
  onStackChange,
  heading,
  testId,
  modalWrapperClassName,
}: Props) {
  const [scrollDistance, setScrollDistance] = useState(
    canUseDOM ? getScrollDistance() : 0,
  );
  const dialog: React.RefObject<HTMLDivElement> = useRef(null);

  /* Prevent window from being scrolled programatically so that the modal is positioned correctly
   * and to prevent scrollIntoView from scrolling the window.
   */
  const handleWindowScroll = useCallback(() => {
    if (getScrollDistance() !== scrollDistance) {
      window.scrollTo(window.pageXOffset, scrollDistance);
    }
  }, [scrollDistance]);

  useEffect(() => {
    const newScrollDistance = getScrollDistance();
    if (getScrollDistance() !== scrollDistance) {
      // eslint-disable-next-line react/no-did-mount-set-state
      setScrollDistance(newScrollDistance);
    }
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWindowScroll, scrollDistance]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (shouldCloseOnOverlayClick) {
      onClose(e);
    }
  };

  const isBackground = stackIndex != null && stackIndex > 0;

  // If a custom width (number or percentage) is supplied, set inline style
  // otherwise allow styled component to consume as named prop
  const widthName = width
    ? WIDTH_ENUM.values.indexOf(width.toString()) !== -1
      ? (width as WidthNames)
      : undefined
    : undefined;
  const widthValue = widthName ? undefined : width;

  const hasOverflow = useCallback(() => {
    return (
      dialog.current &&
      dialog.current.scrollHeight > document.documentElement.clientHeight &&
      scrollBehavior === 'outside'
    );
  }, [scrollBehavior]);

  const getPaddingRight = useCallback(() => {
    if (hasOverflow) {
      return _getScrollbarWidth();
    }
    return 0;
  }, [hasOverflow]);

  return (
    <Animation
      in={isOpen}
      onExited={onCloseComplete}
      onEntered={onOpenComplete}
      stackIndex={stackIndex}
    >
      {({ fade, slide }) => (
        <StyledFillScreen
          className={modalWrapperClassName}
          style={fade}
          aria-hidden={isBackground}
          scrollDistance={scrollDistance}
          overflowY={hasOverflow ? 'scroll' : 'auto'}
        >
          <FocusLock
            isEnabled={stackIndex === 0 && isOpen}
            autoFocus={autoFocus}
          >
            <Blanket
              isTinted
              onBlanketClicked={handleOverlayClick}
              paddingRight={getPaddingRight()}
            />
            <Positioner
              style={slide}
              scrollBehavior={scrollBehavior}
              widthName={widthName}
              widthValue={widthValue}
            >
              <Dialog
                ref={dialog}
                heightValue={height}
                isChromeless={isChromeless}
                role="dialog"
                data-testid={testId}
                tabIndex={-1}
              >
                <Content
                  actions={actions}
                  appearance={appearance}
                  components={components}
                  footer={footer}
                  heading={heading}
                  isHeadingMultiline={isHeadingMultiline}
                  header={header}
                  onClose={onClose}
                  shouldScroll={scrollBehavior === 'inside'}
                  shouldCloseOnEscapePress={shouldCloseOnEscapePress}
                  onStackChange={onStackChange}
                  isChromeless={isChromeless}
                  stackIndex={stackIndex}
                  body={body}
                >
                  {children}
                </Content>
              </Dialog>
            </Positioner>
          </FocusLock>
        </StyledFillScreen>
      )}
    </Animation>
  );
}

const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export const ModalDialogWithoutAnalytics = Modal;

export default withAnalyticsContext({
  componentName: 'modalDialog',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onClose: createAndFireEventOnGuidu({
      action: 'closed',
      actionSubject: 'modalDialog',

      attributes: {
        componentName: 'modalDialog',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(Modal),
);
