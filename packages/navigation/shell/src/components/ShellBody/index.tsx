import Observer from '@researchgate/react-intersection-observer';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
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
}: ShellBodyProps) {
  const [shadowedHeader, setShadowedHeader] = useState(false);
  const element: React.RefObject<any> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  useEffect(() => {
    if (!!scrollable) {
      disableBodyScroll(element.current);
    }
    return () => {
      enableBodyScroll(element.current);
    };
  }, []);

  const handleHeader = e => {
    setShadowedHeader(!e.isIntersecting);
  };

  return (
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
            width={element.current?.offsetWidth}
          />
        </>
      )}
      {children}
    </Body>
  );
}

export default React.forwardRef((props: ShellBodyProps, ref: any) => {
  return <ShellBody {...(props as ShellBodyProps)} forwardedRef={ref} />;
});
