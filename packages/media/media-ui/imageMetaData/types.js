export var ImageType;
(function (ImageType) {
    ImageType["JPEG"] = "image/jpeg";
    ImageType["PNG"] = "image/png";
})(ImageType || (ImageType = {}));
export var SupportedImageMetaTag;
(function (SupportedImageMetaTag) {
    SupportedImageMetaTag["XResolution"] = "XResolution";
    SupportedImageMetaTag["YResolution"] = "YResolution";
    SupportedImageMetaTag["Orientation"] = "Orientation";
})(SupportedImageMetaTag || (SupportedImageMetaTag = {}));
// http://sylvana.net/jpegcrop/exif_orientation.html
export var ExifOrientation = {
    'top-left': 1,
    'top-right': 2,
    'bottom-right': 3,
    'bottom-left': 4,
    'left-top': 5,
    'right-top': 6,
    'right-bottom': 7,
    'left-bottom': 8,
};
//# sourceMappingURL=types.js.map