import Observer from '@researchgate/react-intersection-observer';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Body, ObserverComponent, Shadow } from './styled';
import { ShellBodyProps } from './types';

function ShellBody({
  id = null,
  forwardedRef,
  children,
  shadowOnScroll = true,
  className = null,
  scrollable,
  enableCustomScrollbars = false,
  customScrollbarProps = {},
}: ShellBodyProps) {
  const [shadowedHeader, setShadowedHeader] = useState(false);
  const element: React.RefObject<any> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  useEffect(() => {
    const scrollableElement = getScrollable();
    if (!!scrollable) {
      disableBodyScroll(scrollableElement);
    }
    return () => {
      enableBodyScroll(scrollableElement);
    };
  }, []);

  const getScrollable = () => {
    return enableCustomScrollbars
      ? element.current?.osInstance().getElements().viewport
      : element.current;
  };

  const handleHeader = (e) => {
    setShadowedHeader(!e.isIntersecting);
  };

  const content = (
    <Body id={id} scrollable={scrollable} ref={element} className={className}>
      {shadowOnScroll && (
        <>
          <Observer
            onChange={handleHeader}
            root={forwardedRef && forwardedRef.current}
          >
            <ObserverComponent />
          </Observer>
          <Shadow
            active={shadowedHeader}
            width={getScrollable()?.offsetWidth}
          />
        </>
      )}
      {children}
    </Body>
  );

  if (enableCustomScrollbars && scrollable) {
    return (
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
    );
  }

  return content;
}

export default React.forwardRef((props: ShellBodyProps, ref: any) => {
  return <ShellBody {...(props as ShellBodyProps)} forwardedRef={ref} />;
});
