import React, { useEffect } from 'react';

type Rectangle = Omit<DOMRectReadOnly, 'toJSON'>;
type ResizeCallback = (rect: Rectangle) => void;
let resizeObserver: ResizeObserver;
const nodeToCallback = new WeakMap<Element, ResizeCallback>();

export default function useObservedWidth(node?: Element | null): Rectangle {
  const [rect, setRect] = React.useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  useEffect(() => {
    if (!node) {
      return;
    }
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (nodeToCallback.has(entry.target)) {
            nodeToCallback.get(entry.target)!(entry.contentRect);
          }
        }
      });
    }

    nodeToCallback.set(node, (r: Rectangle) => {
      const { x, y, width, height, top, left, bottom, right } = r;
      return setRect({ x, y, width, height, top, left, bottom, right });
    });
    resizeObserver.observe(node);

    return () => {
      resizeObserver.unobserve(node);
      nodeToCallback.delete(node);
    };
  }, [node]);

  return rect;
}
