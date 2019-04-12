export var mockLoadImage = function (naturalWidth, naturalHeight, orientation) {
    if (naturalWidth === void 0) { naturalWidth = 1; }
    if (naturalHeight === void 0) { naturalHeight = 1; }
    if (orientation === void 0) { orientation = 1; }
    var media_ui = require.requireActual('@atlaskit/media-ui');
    jest.spyOn(media_ui, 'getOrientation').mockResolvedValue(orientation);
    jest
        .spyOn(media_ui, 'loadImage')
        .mockResolvedValue({ naturalWidth: naturalWidth, naturalHeight: naturalHeight });
};
export var mockLoadImageError = function (errorMessage) {
    if (errorMessage === void 0) { errorMessage = 'some-image-failed-to-load-reason'; }
    var media_ui = require.requireActual('@atlaskit/media-ui');
    jest.spyOn(media_ui, 'getOrientation').mockResolvedValue(1);
    jest.spyOn(media_ui, 'loadImage').mockImplementation(function () {
        throw new Error(errorMessage);
    });
};
export var unMockLoadImage = function () {
    var media_ui = require.requireActual('@atlaskit/media-ui');
    media_ui.getOrientation.mockClear();
    media_ui.loadImage.mockClear();
};
//# sourceMappingURL=mockLoadImage.js.map