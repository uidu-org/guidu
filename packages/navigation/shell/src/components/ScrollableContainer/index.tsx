import loadable from '@loadable/component';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useInView } from 'react-intersection-observer';
// import 'overlayscrollbars/overlayscrollbars.css';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Shadow, StyledScrollableContainer } from './styled';
import { ShellBodyProps } from './types';

const OverlayScrollbars = loadable.lib(() => import('overlayscrollbars-react'));

function DefaultInnerComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return <div className={className}>{children}</div>;
}

function ScrollableContainer({
  id = null,
  forwardedRef,
  children,
  shadowOnScroll = true,
  className = null,
  innerClassName = null,
  innerComponent: InnerComponent = DefaultInnerComponent,
  enableCustomScrollbars = false,
  customScrollbarProps = {},
}: ShellBodyProps) {
  const element: React.RefObject<HTMLDivElement> = useRef();
  const overlayScrollbar = useRef(null);

  useImperativeHandle(forwardedRef, () => element.current, []);

  const getScrollable = useCallback<() => HTMLDivElement>(
    () =>
      enableCustomScrollbars && overlayScrollbar.current
        ? element.current?.getElement()
        : element.current,
    [enableCustomScrollbars, overlayScrollbar],
  );

  useEffect(() => {
    const scrollableElement = getScrollable();
    if (scrollableElement) disableBodyScroll(scrollableElement);
    return () => {
      enableBodyScroll(scrollableElement);
    };
  }, [getScrollable]);

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
    root: forwardedRef && forwardedRef.current,
  });

  const content = (
    <StyledScrollableContainer id={id} ref={element} className={className}>
      {shadowOnScroll && (
        <>
          <div ref={ref} tw="w-full" />
          <Shadow active={!inView} width={getScrollable()?.offsetWidth} />
        </>
      )}
      <InnerComponent className={innerClassName}>{children}</InnerComponent>
    </StyledScrollableContainer>
  );

  if (enableCustomScrollbars) {
    return (
      <OverlayScrollbars ref={overlayScrollbar}>
        {({ OverlayScrollbarsComponent }) => (
          <OverlayScrollbarsComponent
            options={{
              className: 'os-theme-dark',
              scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
              ...customScrollbarProps,
            }}
            ref={element}
          >
            {content}
          </OverlayScrollbarsComponent>
        )}
      </OverlayScrollbars>
    );
  }

  return content;
}

export default React.forwardRef(
  (
    {
      id = undefined,
      children,
      shadowOnScroll = true,
      className = null,
      innerClassName = null,
      enableCustomScrollbars = false,
      customScrollbarProps = {},
    }: ShellBodyProps,
    ref: any,
  ) => (
    <ScrollableContainer
      id={id}
      shadowOnScroll={shadowOnScroll}
      className={className}
      innerClassName={innerClassName}
      enableCustomScrollbars={enableCustomScrollbars}
      customScrollbarProps={customScrollbarProps}
      forwardedRef={ref}
    >
      {children}
    </ScrollableContainer>
  ),
);
