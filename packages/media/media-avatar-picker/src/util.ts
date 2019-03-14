export function dataURItoFile(
  dataURI: string,
  filename: string = 'untitled',
): File {
  if (dataURI.length === 0) {
    throw new Error('dataURI not found');
  }

  // convert base64/URLEncoded data component to raw binary data held in a string
  const byteString =
    dataURI.split(',')[0].indexOf('base64') >= 0
      ? atob(dataURI.split(',')[1])
      : decodeURIComponent(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString;
  try {
    mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
  } catch (e) {
    mimeString = 'unknown';
  }

  // write the bytes of the string to a typed array
  const intArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([intArray], { type: mimeString });
  try {
    return new File([blob], filename, { type: mimeString });
  } catch (e) {
    // IE11 and Safari does not support the File constructor.
    // This util method is only used to convert a dataURI to the File object which will be given back to consumers via the onImageSaved property of AvatarPickerDialog.
    // Consumers should really only care about the bytes (for upload) which are part of the Blob prototype.
    // When we cast here to work around IE11 and Safari, we are still giving the byte data back, but just loosing the "lastModified", "lastModifiedData", and "name" properties of File.
    // These properties should not be required by consumers when receiving the file, only the byte data should be important.
    return blob as File;
  }
}

export function fileToDataURI(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // TODO: [ts30] Add proper handling for null and ArrayBuffer
      res(reader.result as string);
    });
    reader.addEventListener('error', rej);
    reader.readAsDataURL(file);
  });
}

export function fileSizeMb(file: File): number {
  return file.size / 1024 / 1024;
}
