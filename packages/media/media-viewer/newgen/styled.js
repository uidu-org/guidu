import * as tslib_1 from "tslib";
// StyledComponentClass and React types are imported to prevent a typescript error caused by inferred types sourced
// from external modules - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
// @ts-ignore: unused variable
// prettier-ignore
import styled from 'styled-components';
import { colors, layers, borderRadius } from '@uidu/theme';
import { ellipsis } from '@uidu/media-ui';
var overlayZindex = layers.modal() + 10;
export var mediaTypeIconColors = {
    image: colors.Y200,
    audio: colors.P200,
    video: '#ff7143',
    doc: colors.B300,
    unknown: '#3dc7dc',
};
export var blanketColor = colors.DN30;
export var hideControlsClassName = 'mvng-hide-controls';
export var Blanket = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: ", ";\n  z-index: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: ", ";\n  z-index: ", ";\n"])), blanketColor, overlayZindex);
export var HeaderWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 98px;\n  opacity: 0.85;\n  background-image: linear-gradient(to bottom, #0e1624, rgba(14, 22, 36, 0));\n  color: #b8c7e0;\n  font-weight: 500;\n  padding-top: 15px;\n  padding: 24px;\n  box-sizing: border-box;\n  pointer-events: none;\n  z-index: ", ";\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 98px;\n  opacity: 0.85;\n  background-image: linear-gradient(to bottom, #0e1624, rgba(14, 22, 36, 0));\n  color: #b8c7e0;\n  font-weight: 500;\n  padding-top: 15px;\n  padding: 24px;\n  box-sizing: border-box;\n  pointer-events: none;\n  z-index: ", ";\n"])), overlayZindex + 1);
HeaderWrapper.displayName = 'HeaderWrapper';
export var ListWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""])));
ListWrapper.displayName = 'ListWrapper';
export var ArrowsWrapper = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 0;\n  width: 100%;\n"], ["\n  display: flex;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 0;\n  width: 100%;\n"])));
export var CloseButtonWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 24px;\n  right: 20px;\n  z-index: ", ";\n"], ["\n  position: absolute;\n  top: 24px;\n  right: 20px;\n  z-index: ", ";\n"])), overlayZindex + 2);
export var ZoomWrapper = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  position: fixed;\n  bottom: 0;\n  height: 98px;\n  background-image: linear-gradient(to top, #0e1624, rgba(14, 22, 36, 0));\n  opacity: 0.85;\n  pointer-events: none;\n"], ["\n  width: 100%;\n  position: fixed;\n  bottom: 0;\n  height: 98px;\n  background-image: linear-gradient(to top, #0e1624, rgba(14, 22, 36, 0));\n  opacity: 0.85;\n  pointer-events: none;\n"])));
export var ZoomControlsWrapper = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  position: absolute;\n  text-align: center;\n  bottom: 10px;\n  button {\n    margin-right: 10px;\n  }\n  > * {\n    pointer-events: all;\n  }\n"], ["\n  width: 100%;\n  position: absolute;\n  text-align: center;\n  bottom: 10px;\n  button {\n    margin-right: 10px;\n  }\n  > * {\n    pointer-events: all;\n  }\n"])));
export var ZoomLevelIndicator = styled.span(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  right: 24px;\n  bottom: 22px;\n  color: #b8c7e0;\n  pointer-events: all;\n"], ["\n  position: absolute;\n  right: 24px;\n  bottom: 22px;\n  color: #b8c7e0;\n  pointer-events: all;\n"])));
var handleControlsVisibility = function (_a) {
    var showControls = _a.showControls;
    return "\n  transition: opacity .3s;\n  opacity: " + (showControls ? '1' : '0') + ";\n";
};
export var ContentWrapper = styled.div(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  overflow: auto;\n  align-items: center;\n  justify-content: center;\n\n  .", " {\n    ", ";\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  overflow: auto;\n  align-items: center;\n  justify-content: center;\n\n  .", " {\n    ", ";\n  }\n"])), hideControlsClassName, handleControlsVisibility);
ContentWrapper.displayName = 'Content';
export var ErrorMessageWrapper = styled.div(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n  text-align: center;\n  color: #b8c7e0;\n  p {\n    line-height: 100%;\n  }\n"], ["\n  text-align: center;\n  color: #b8c7e0;\n  p {\n    line-height: 100%;\n  }\n"])));
export var ErrorImage = styled.img(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n  margin-bottom: 10px;\n  user-select: none;\n"], ["\n  margin-bottom: 10px;\n  user-select: none;\n"])));
export var Video = styled.video(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n  width: 100vw;\n  height: 100vh;\n"], ["\n  width: 100vw;\n  height: 100vh;\n"])));
export var PDFWrapper = styled.div(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n"], ["\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n"])));
export var Arrow = styled.span(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n  cursor: pointer;\n\n  > span {\n    color: rgba(27, 38, 56, 0.5);\n    fill: #9fb0cc;\n    filter: drop-shadow(1px 1px 1px rgba(27, 38, 56, 0.2));\n\n    &:hover {\n      color: #fff;\n    }\n  }\n"], ["\n  cursor: pointer;\n\n  > span {\n    color: rgba(27, 38, 56, 0.5);\n    fill: #9fb0cc;\n    filter: drop-shadow(1px 1px 1px rgba(27, 38, 56, 0.2));\n\n    &:hover {\n      color: #fff;\n    }\n  }\n"])));
var ArrowWrapper = styled.div(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  padding: 20px;\n"], ["\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  padding: 20px;\n"])));
export var LeftWrapper = styled(ArrowWrapper)(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n  text-align: left;\n  left: 0;\n"], ["\n  text-align: left;\n  left: 0;\n"])));
export var RightWrapper = styled(ArrowWrapper)(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n  text-align: right;\n  right: 0;\n"], ["\n  text-align: right;\n  right: 0;\n"])));
// header.tsx
export var Header = styled.div(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
export var LeftHeader = styled.div(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n  flex: 1;\n  overflow: hidden;\n  > * {\n    pointer-events: all;\n  }\n"], ["\n  flex: 1;\n  overflow: hidden;\n  > * {\n    pointer-events: all;\n  }\n"])));
export var ImageWrapper = styled.div(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["\n  width: 100vw;\n  height: 100vh;\n  overflow: auto;\n  text-align: center;\n  vertical-align: middle;\n  white-space: nowrap;\n"], ["\n  width: 100vw;\n  height: 100vh;\n  overflow: auto;\n  text-align: center;\n  vertical-align: middle;\n  white-space: nowrap;\n"])));
export var BaselineExtend = styled.div(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["\n  height: 100%;\n  display: inline-block;\n  vertical-align: middle;\n"], ["\n  height: 100%;\n  display: inline-block;\n  vertical-align: middle;\n"])));
export var Img = styled.img(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  vertical-align: middle;\n  position: relative;\n  cursor: ", ";\n  ", "\n"], ["\n  display: inline-block;\n  vertical-align: middle;\n  position: relative;\n  cursor: ",
    ";\n  ",
    "\n"])), function (_a) {
    var canDrag = _a.canDrag, isDragging = _a.isDragging;
    if (canDrag && isDragging) {
        return 'grabbing';
    }
    else if (canDrag) {
        return 'grab';
    }
    else {
        return 'auto';
    }
}, function (_a) {
    var shouldPixelate = _a.shouldPixelate;
    return shouldPixelate
        ? "/* Prevent images from being smoothed when scaled up */\n    image-rendering: optimizeSpeed; /* Legal fallback */\n    image-rendering: -moz-crisp-edges; /* Firefox        */\n    image-rendering: -o-crisp-edges; /* Opera          */\n    image-rendering: -webkit-optimize-contrast; /* Safari         */\n    image-rendering: optimize-contrast; /* CSS3 Proposed  */\n    image-rendering: crisp-edges; /* CSS4 Proposed  */\n    image-rendering: pixelated; /* CSS4 Proposed  */\n    -ms-interpolation-mode: nearest-neighbor; /* IE8+           */"
        : "";
});
export var MedatadataTextWrapper = styled.div(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["\n  overflow: hidden;\n"], ["\n  overflow: hidden;\n"])));
export var MetadataWrapper = styled.div(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
export var MetadataFileName = styled.div(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["\n  &::first-letter {\n    text-transform: uppercase;\n  }\n  ", ";\n"], ["\n  &::first-letter {\n    text-transform: uppercase;\n  }\n  ", ";\n"])), ellipsis());
export var MetadataSubText = styled.div(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  ", ";\n"], ["\n  color: ", ";\n  ", ";\n"])), colors.DN400, ellipsis());
export var MetadataIconWrapper = styled.div(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["\n  padding-top: 4px;\n  padding-right: 12px;\n"], ["\n  padding-top: 4px;\n  padding-right: 12px;\n"])));
export var IconWrapper = styled.div(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["\n  display: inline-flex;\n  color: ", ";\n"], ["\n  display: inline-flex;\n  color: ",
    ";\n"])), function (_a) {
    var type = _a.type;
    return mediaTypeIconColors[type] || mediaTypeIconColors.unknown;
});
export var RightHeader = styled.div(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["\n  text-align: right;\n  margin-right: 40px;\n  min-width: 200px;\n  > * {\n    pointer-events: all;\n  }\n"], ["\n  text-align: right;\n  margin-right: 40px;\n  min-width: 200px;\n  > * {\n    pointer-events: all;\n  }\n"])));
export var CustomAudioPlayerWrapper = styled.div(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n"], ["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n"])));
export var AudioPlayer = styled.div(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  border-radius: ", ";\n  align-items: center;\n  justify-content: center;\n  width: 400px;\n  height: 400px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n"], ["\n  background-color: ", ";\n  border-radius: ", ";\n  align-items: center;\n  justify-content: center;\n  width: 400px;\n  height: 400px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n"])), blanketColor, borderRadius());
AudioPlayer.displayName = 'AudioPlayer';
export var Audio = styled.audio(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n"], ["\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n"])));
export var AudioCover = styled.img(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: scale-down;\n  background-color: #000000;\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: scale-down;\n  background-color: #000000;\n"])));
export var DefaultCoverWrapper = styled.div(templateObject_34 || (templateObject_34 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  > * {\n    transform: scale(2);\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  > * {\n    transform: scale(2);\n  }\n"])));
export var DownloadButtonWrapper = styled.div(templateObject_35 || (templateObject_35 = tslib_1.__makeTemplateObject(["\n  margin-top: 28px;\n  text-align: center;\n\n  button {\n    font-weight: bold;\n  }\n"], ["\n  margin-top: 28px;\n  text-align: center;\n\n  button {\n    font-weight: bold;\n  }\n"])));
export var CustomVideoPlayerWrapper = styled.div(templateObject_36 || (templateObject_36 = tslib_1.__makeTemplateObject(["\n  video {\n    flex: 1;\n    width: 100vw;\n    height: 100vh;\n    max-height: 100vh;\n  }\n"], ["\n  video {\n    flex: 1;\n    width: 100vw;\n    height: 100vh;\n    max-height: 100vh;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36;
//# sourceMappingURL=styled.js.map