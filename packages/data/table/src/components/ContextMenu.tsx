import Portal from '@uidu/portal';
import React, { useState } from 'react';
import useContextMenu from './useContextMenu';

export default function ContextMenu({
  targetRef,
  children,
}: {
  targetRef: React.RefObject<HTMLElement>;
  children: ({
    show,
    setShow,
  }: {
    show: boolean;
    setShow: (show: boolean) => void;
  }) => React.ReactNode;
}) {
  const [contextElement, setContextElement] = useState<HTMLDivElement>(null);

  const { anchorPoint, show, setShow } = useContextMenu({
    targetRef,
    contextElement,
  });

  if (show) {
    return (
      <Portal>
        <div
          ref={(node) => {
            setContextElement(node);
          }}
          tw="absolute z-50 rounded block overflow-auto border border-opacity-50 shadow [background:rgb(var(--body-primary-bg))] flex-auto"
          style={{ top: anchorPoint.y, left: anchorPoint.x }}
          className="ignore-onclickoutside"
        >
          {children({ show, setShow })}
        </div>
      </Portal>
    );
  }
  return null;
}
