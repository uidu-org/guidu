import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

const useContextMenu = ({
  targetRef,
  contextElement,
}: {
  targetRef: RefObject<HTMLElement>;
  contextElement: HTMLElement;
}) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  useOnclickOutside(
    () => {
      setShow(false);
    },
    { refs: [targetRef] },
  );

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setShow, setAnchorPoint],
  );

  useEffect(() => {
    const target = targetRef.current;
    target.addEventListener('contextmenu', handleContextMenu);
    return () => {
      target.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [targetRef, handleContextMenu]);

  useLayoutEffect(() => {
    const target = contextElement;
    if (target) {
      if (anchorPoint.x + target.offsetWidth > window.innerWidth) {
        setAnchorPoint((prev) => ({
          ...prev,
          x: prev.x - target.offsetWidth,
        }));
      }
      if (anchorPoint.y + target.offsetHeight > window.innerHeight) {
        setAnchorPoint((prev) => ({
          ...prev,
          y: prev.y - target.offsetHeight,
        }));
      }
    }
  }, [anchorPoint, contextElement]);

  return { anchorPoint, show, setShow };
};

export default useContextMenu;
