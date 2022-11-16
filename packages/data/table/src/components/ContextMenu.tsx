import Portal from '@uidu/portal';
import React, { useState } from 'react';
import useContextMenu from './useContextMenu';

export default function ContextMenu({
  targetRef,
  children,
}: {
  targetRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}) {
  const [contextElement, setContextElement] = useState<HTMLDivElement>(null);

  const { anchorPoint, show } = useContextMenu({ targetRef, contextElement });

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
          {children}
        </div>
      </Portal>
    );
  }
  return null;
}
