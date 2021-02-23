import React, { useCallback, useEffect, useRef } from 'react';
import { AutoDismissFlagProps } from '../../types';
import Flag from '../Flag';

export const AUTO_DISMISS_SECONDS = 8;

export default function AutoDismissFlag(props: AutoDismissFlagProps) {
  const { delay = 4800, onDismissed, isDismissAllowed, id } = props;
  const autoDismissTimer = useRef(null);

  const isAutoDismissAllowed = useCallback(
    () => isDismissAllowed && onDismissed,
    [isDismissAllowed, onDismissed],
  );

  const dismissFlag = useCallback(() => {
    if (isAutoDismissAllowed() && onDismissed) {
      onDismissed(id);
    }
  }, [isAutoDismissAllowed, onDismissed, id]);

  const handleAutoDismissTimerEnd = useCallback(() => dismissFlag(), [
    dismissFlag,
  ]);

  const startAutoDismissTimer = useCallback(() => {
    if (!isAutoDismissAllowed()) {
      return;
    }

    stopAutoDismissTimer();
    autoDismissTimer.current = window.setTimeout(
      handleAutoDismissTimerEnd,
      delay,
    );
  }, [isAutoDismissAllowed, handleAutoDismissTimerEnd, delay]);

  useEffect(() => {
    startAutoDismissTimer();
    return () => {
      stopAutoDismissTimer();
    };
  }, [startAutoDismissTimer]);

  // componentDidUpdate(prevProps: AutoDismissFlagProps) {
  //   if (this.props.isDismissAllowed && !prevProps.isDismissAllowed) {
  //     this.startAutoDismissTimer();
  //   } else if (!this.props.isDismissAllowed && prevProps.isDismissAllowed) {
  //     this.stopAutoDismissTimer();
  //   }
  // }

  const stopAutoDismissTimer = () => {
    if (autoDismissTimer.current) {
      clearTimeout(autoDismissTimer.current);
      autoDismissTimer.current = null;
    }
  };

  const handleInteractionStart = () => {
    stopAutoDismissTimer();
  };

  const handleInteractionEnd = () => {
    startAutoDismissTimer();
  };

  return (
    <Flag
      onMouseOver={handleInteractionStart}
      onFocus={handleInteractionStart}
      onMouseOut={handleInteractionEnd}
      onBlur={handleInteractionEnd}
      {...props}
    />
  );
}
