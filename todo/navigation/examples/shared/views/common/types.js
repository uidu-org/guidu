// @flow

export type ViewComponentProps = {
  getItemsFactory: any => () => Array<*>,
  viewId: string,
  type: 'product' | 'container',
  getAnalyticsAttributes?: *,
};
