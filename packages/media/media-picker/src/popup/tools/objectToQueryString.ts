export const objectToQueryString = (json: {
  [key: string]: string | number | boolean;
}) =>
  Object.keys(json)
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          json[key].toString(),
        )}`,
    )
    .join('&');
