export const promiseAllWithNonFailFast = (
  promises: Promise<any>[],
  errorCollector?: (error: Error) => void,
) => {
  const wrappedPromises = promises.map(p =>
    p.catch(error => {
      if (errorCollector) {
        errorCollector(error);
      }
    }),
  );
  return Promise.all(wrappedPromises);
};
