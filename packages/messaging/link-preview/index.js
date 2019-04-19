import * as tslib_1 from "tslib";
import React, { useState, useEffect, Fragment } from 'react';
import { CardWrap, CardMedia, CardContent, CardEmpty } from './components/Card';
import axios from 'axios';
import { defaultApiParameters, isNil, createApiUrl, fetchFromApiUrl, fetchFromApi, getUrlPath, imageProxy, someProp, isFunction, extractFirstUrl, } from './utils';
var Card = function (_a) {
    var url = _a.url, size = _a.size, title = _a.title, description = _a.description, logo = _a.logo, props = tslib_1.__rest(_a, ["url", "size", "title", "description", "logo"]);
    return (React.createElement(Fragment, null,
        React.createElement(CardMedia, tslib_1.__assign({ url: url, cardSize: size }, props)),
        React.createElement(CardContent, { className: "microlink_card__content", title: title, description: description, url: url, cardSize: size, logo: logo })));
};
function LinkPreview(props) {
    var autoPlay = props.autoPlay, controls = props.controls, loop = props.loop, setData = props.setData, muted = props.muted, loadingProp = props.loading, playsInline = props.playsInline, className = props.className, size = props.size, onScraped = props.onScraped, restProps = tslib_1.__rest(props, ["autoPlay", "controls", "loop", "setData", "muted", "loading", "playsInline", "className", "size", "onScraped"]);
    var _a = tslib_1.__read(useState(loadingProp), 2), loading = _a[0], setLoading = _a[1];
    var _b = tslib_1.__read(useState({}), 2), state = _b[0], setState = _b[1];
    var fetchData = function () {
        setLoading(true);
        var oldSource = state.source;
        oldSource && oldSource.cancel('Operation canceled by the user.');
        var newSource = axios.CancelToken.source();
        setState({ source: newSource });
        var fetch = isFunction(setData)
            ? Promise.resolve({})
            : fetchFromApi(props, newSource);
        fetch.then(function (_a) {
            var data = _a.data;
            return mergeData(data);
        });
    };
    var mergeData = function (fetchData) {
        var payload = isFunction(setData)
            ? setData(fetchData)
            : tslib_1.__assign({}, fetchData, setData);
        var title = payload.title, description = payload.description, url = payload.url, video = payload.video, image = payload.image, logo = payload.logo;
        var imageUrl;
        var videoUrl;
        var media = {};
        var isVideo = false;
        if (isNil(video)) {
            media = someProp(payload, [].concat(props.media)) || image || logo;
            imageUrl = getUrlPath(media);
        }
        else {
            media = image || logo;
            videoUrl = getUrlPath(video);
            imageUrl = getUrlPath(media);
            isVideo = true;
        }
        var color = media.color, backgroundColor = media.background_color;
        setLoading(false);
        onScraped(payload);
        setState({
            url: url,
            color: color,
            title: title,
            description: description,
            imageUrl: imageUrl,
            videoUrl: videoUrl,
            isVideo: isVideo,
            backgroundColor: backgroundColor,
            logo: logo,
        });
    };
    useEffect(fetchData, [props.url, setData]);
    var title = state.title, color = state.color, backgroundColor = state.backgroundColor, url = state.url, description = state.description, logo = state.logo, imageUrl = state.imageUrl, videoUrl = state.videoUrl, isVideo = state.isVideo;
    var isLoading = isNil(loadingProp) ? loading : loadingProp;
    return (React.createElement(CardWrap, tslib_1.__assign({ className: className ? "microlink_card " + className : 'microlink_card', href: url, title: title, cardSize: size, color: color, backgroundColor: backgroundColor, loading: isLoading }, restProps), isLoading ? (React.createElement(CardEmpty, { cardSize: size })) : (React.createElement(Card, { title: title, description: description, url: url, isVideo: isVideo, imageUrl: imageUrl, videoUrl: videoUrl, autoPlay: autoPlay, controls: controls, loop: loop, muted: muted, playsInline: playsInline, size: size, logo: logo }))));
}
LinkPreview.defaultProps = tslib_1.__assign({ apiKey: undefined, autoPlay: true, controls: true, media: ['image', 'logo'], loop: true, muted: true, playsInline: true, direction: 'ltr', size: 'normal', onScraped: function () { } }, defaultApiParameters);
// Microlink.propTypes = {
//   apiKey: PropTypes.string,
//   autoPlay: PropTypes.bool,
//   contrast: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   controls: PropTypes.bool,
//   media: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string),
//   ]),
//   loop: PropTypes.bool,
//   muted: PropTypes.bool,
//   direction: PropTypes.string,
//   playsInline: PropTypes.bool,
//   prerender: PropTypes.oneOf(['auto', true, false]),
//   size: PropTypes.oneOf(['normal', 'large']),
//   url: PropTypes.string,
// };
export { imageProxy, createApiUrl, fetchFromApiUrl, fetchFromApi, extractFirstUrl, };
export default LinkPreview;
//# sourceMappingURL=index.js.map