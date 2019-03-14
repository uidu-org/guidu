// @flow
// There are cases where the context is not available, such as when a dropdown item is used
// inside @uidu/navigation. For this reason we have this helper function which safely calls
// the context functions if they are available.
export default (instance: { context: {} }, contextKey: string) => (
  fnToCall: string,
  ...args: Array<any>
): any => {
  if (!instance.context[contextKey]) {
    return null;
  }

  return instance.context[contextKey][fnToCall](...args);
};
