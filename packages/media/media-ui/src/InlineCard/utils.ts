export const truncateUrlForErrorView = (
  str: string,
  len: number = 40,
): string => {
  const clean = str.replace(/https?:\/\//gi, '');
  return clean.length > len - 3 ? clean.substr(0, len) + '...' : clean;
};
