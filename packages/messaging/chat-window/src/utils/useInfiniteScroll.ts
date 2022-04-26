import { useCallback, useEffect, useState } from 'react';

const useInfiniteScroll = (
  elementRef,
  scrollLoadTreshold,
  flipped,
  callback,
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [lastY, setLastY] = useState(null);

  const handleScroll = useCallback(
    (e) => {
      setLastY(elementRef.current.scrollHeight);
      if (flipped) {
        if (elementRef.current.scrollTop > scrollLoadTreshold || isFetching)
          return;
        setIsFetching(true);
      } else {
        if (
          elementRef.current.scrollTop <
            elementRef.current.scrollHeight -
              elementRef.current.clientHeight -
              scrollLoadTreshold ||
          isFetching
        )
          return;
        setIsFetching(true);
      }
    },
    [elementRef, flipped, scrollLoadTreshold, isFetching],
  );

  useEffect(() => {
    elementRef.current.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () =>
      elementRef.current?.removeEventListener('scroll', handleScroll, {
        passive: true,
      });
  }, [elementRef, handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  return { isFetching, setIsFetching, lastY };
};

export default useInfiniteScroll;
