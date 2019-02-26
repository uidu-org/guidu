// @flow
// eslint-disable-next-line import/prefer-default-export
export const dispatchMouseEvent = (
  eventName: string,
  options?: Object = {},
  target: EventTarget = window,
): MouseEvent => {
  const event = new window.MouseEvent(eventName, {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  });

  target.dispatchEvent(event);
  return event;
};
