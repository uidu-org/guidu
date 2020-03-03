import Observer from '@researchgate/react-intersection-observer';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { useEffect, useRef, useState } from 'react';
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
  const ref: React.RefObject<any> = useRef(forwardedRef);

  useEffect(() => {
    if (!!scrollable) {
      disableBodyScroll(ref.current);
    }
    return () => {
      enableBodyScroll(ref.current);
    };
  }, []);

  const handleHeader = e => {
    setShadowedHeader(!e.isIntersecting);
  };

  return (
    <Body id={id} scrollable={scrollable} ref={ref} className={className}>
      {shadowOnScroll && (
        <>
          <Observer
            onChange={handleHeader}
            root={forwardedRef && forwardedRef.current}
          >
            <ObserverComponent />
          </Observer>
          <Shadow active={shadowedHeader} width={ref.current?.offsetWidth} />
        </>
      )}
      {children}
    </Body>
  );
}

export default React.forwardRef((props: ShellBodyProps, ref: any) => {
  return <ShellBody {...(props as ShellBodyProps)} forwardedRef={ref} />;
});
