import * as tslib_1 from "tslib";
import React, { useState, Fragment } from 'react';
import { getUrlPath } from '../../../utils';
import { ImageLoadCatcher } from './loader';
import Image from './Image';
import Video from './Video';
var isUrl = function (url) { return getUrlPath(url) !== null; };
function CardMedia(props) {
    var videoUrl = props.videoUrl, imageUrl = props.imageUrl, isVideo = props.isVideo;
    var mediaUrl = isVideo ? videoUrl : imageUrl;
    var _a = tslib_1.__read(useState(!isUrl(mediaUrl)), 2), loading = _a[0], setLoading = _a[1];
    var MediaComponent = isVideo ? Video : Image;
    return (React.createElement(Fragment, null,
        React.createElement(MediaComponent, tslib_1.__assign({}, props, { loading: loading })),
        loading && (React.createElement(ImageLoadCatcher, { src: mediaUrl, onLoad: function () { return setLoading(false); } }))));
}
export default CardMedia;
//# sourceMappingURL=index.js.map