/*
cleanProps removes props added by the withAnalyticsEvents HOC from an object
*/
export default function cleanProps(props: any) {
  /* eslint-disable no-unused-vars */
  const { createAnalyticsEvent, ...cleanedProps } = props;
  /* eslint-enable no-unused-vars */
  return cleanedProps;
}
