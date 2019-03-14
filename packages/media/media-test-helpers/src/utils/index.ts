export function mapDataUriToBlob(dataUri: string): Blob {
  const match = dataUri.match(/^data:([a-z]+\/[a-z\+]+)(?:;)?(.*)?,(.*)/);
  if (match) {
    const { 1: mediaType, 3: data } = match;
    return new Blob([decodeURIComponent(data)], { type: mediaType });
  } else {
    throw new Error(`Could not parse data uri: ${dataUri}`);
  }
}
