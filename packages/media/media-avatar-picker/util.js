export function dataURItoFile(dataURI, filename) {
    if (filename === void 0) { filename = 'untitled'; }
    if (dataURI.length === 0) {
        throw new Error('dataURI not found');
    }
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = dataURI.split(',')[0].indexOf('base64') >= 0
        ? atob(dataURI.split(',')[1])
        : decodeURIComponent(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString;
    try {
        mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];
    }
    catch (e) {
        mimeString = 'unknown';
    }
    // write the bytes of the string to a typed array
    var intArray = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([intArray], { type: mimeString });
    try {
        return new File([blob], filename, { type: mimeString });
    }
    catch (e) {
        // IE11 and Safari does not support the File constructor.
        // This util method is only used to convert a dataURI to the File object which will be given back to consumers via the onImageSaved property of AvatarPickerDialog.
        // Consumers should really only care about the bytes (for upload) which are part of the Blob prototype.
        // When we cast here to work around IE11 and Safari, we are still giving the byte data back, but just loosing the "lastModified", "lastModifiedData", and "name" properties of File.
        // These properties should not be required by consumers when receiving the file, only the byte data should be important.
        return blob;
    }
}
export function fileToDataURI(file) {
    return new Promise(function (res, rej) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            // TODO: [ts30] Add proper handling for null and ArrayBuffer
            res(reader.result);
        });
        reader.addEventListener('error', rej);
        reader.readAsDataURL(file);
    });
}
export function fileSizeMb(file) {
    return file.size / 1024 / 1024;
}
//# sourceMappingURL=util.js.map