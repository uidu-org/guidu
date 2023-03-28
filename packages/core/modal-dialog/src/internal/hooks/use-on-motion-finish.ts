import type { Transition } from '@atlaskit/motion/types';
import { RefObject, useCallback, useRef } from 'react';
import { ModalDialogProps } from '../../types';

export default function useOnMotionFinish({
  onOpenComplete,
  onCloseComplete,
}: Pick<ModalDialogProps, 'onOpenComplete' | 'onCloseComplete'>): [
  RefObject<HTMLElement>,
  (state: Transition) => void,
] {
  const motionRef = useRef<HTMLElement>(null);
  const onMotionFinish = useCallback(
    (state: Transition) => {
      if (state === 'entering' && onOpenComplete) {
        onOpenComplete(motionRef.current, true);
      }

      if (state === 'exiting' && onCloseComplete) {
        onCloseComplete(motionRef.current);
      }
    },
    [onOpenComplete, onCloseComplete],
  );

  return [motionRef, onMotionFinish];
}
