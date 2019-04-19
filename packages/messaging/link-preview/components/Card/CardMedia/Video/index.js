import * as tslib_1 from "tslib";
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { PlayButton, ProgressBar } from './controls';
import { imageProxy } from '../../../../utils';
import MediaWrap from '../wrap';
var Video = styled('video')(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n\n  ", ";\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n\n  ",
    ";\n"])), function (_a) {
    var autoPlay = _a.autoPlay;
    return autoPlay &&
        "\n    &::media-controls-start-playback-button {\n      display: none;\n      appearance: none;\n    }\n  ";
});
function CardVideo(props) {
    var hasControls = props.controls, autoPlay = props.autoPlay, cardSize = props.cardSize, controls = props.controls, imageUrl = props.imageUrl, videoUrl = props.videoUrl, loading = props.loading, loop = props.loop, muted = props.muted, playsInline = props.playsInline, restProps = tslib_1.__rest(props, ["controls", "autoPlay", "cardSize", "controls", "imageUrl", "videoUrl", "loading", "loop", "muted", "playsInline"]);
    var _a = tslib_1.__read(useState(autoPlay), 2), playing = _a[0], setPlaying = _a[1];
    var _b = tslib_1.__read(useState(0), 2), progress = _b[0], setProgress = _b[1];
    var videoRef = useRef();
    var togglePlayback = function (event) {
        event.preventDefault();
        setPlaying(function (playing) {
            var nextValue = !playing;
            var action = nextValue ? 'play' : 'pause';
            videoRef.current[action]();
            return nextValue;
        });
    };
    var onTimeUpdate = function () {
        var progress = (videoRef.currentTime / videoRef.duration) * 100;
        setProgress(progress);
    };
    return (React.createElement(MediaWrap, tslib_1.__assign({ className: "microlink_card__media_video_wrapper", cardSize: cardSize, loading: loading, onClick: togglePlayback }, restProps),
        React.createElement(Video, tslib_1.__assign({ className: "microlink_card__media microlink_card__media_video", src: videoUrl, poster: imageProxy(imageUrl), muted: muted, autoPlay: autoPlay, loop: loop, playsInline: playsInline, ref: videoRef }, (controls ? { onTimeUpdate: onTimeUpdate } : {}))),
        React.createElement(PlayButton, { cardSize: cardSize, visible: controls && !playing }),
        controls && (React.createElement(ProgressBar, { cardSize: cardSize, progress: progress, playing: playing }))));
}
export default CardVideo;
var templateObject_1;
//# sourceMappingURL=index.js.map