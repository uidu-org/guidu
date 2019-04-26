import { messages } from '@uidu/media-ui';
import { parseHTML } from '../../util/parseHTML';
import { wrapperStyles } from './styled';
import { getAssetUrl } from '../../util/getAssetUrl';
// TODO [MSW-385]: Remove template string and use React
export default (function (formatMessage) {
    return parseHTML("<div class=\"mediaPickerDropzone\">\n    <style>" + wrapperStyles + "</style>\n    <div class=\"mp-content\">\n        <div class=\"mp-circle\">\n            <div class=\"mp-text\">\n                <span class=\"mp-title\">" + formatMessage(messages.drop_your_files_here) + "</span>\n                <span class=\"mp-description\">" + formatMessage(messages.share_files_instantly) + "</span>\n            </div>\n            <img class=\"mp-fileIcon mp-iconAtlassianDoc\" src=\"" + getAssetUrl('pie-chart-icon.png') + "\"/>\n            <img class=\"mp-fileIcon mp-iconOtherDoc\" src=\"" + getAssetUrl('line-graph-icon.png') + "\" />\n            <img class=\"mp-fileIcon mp-iconPageSpreadsheet\" src=\"" + getAssetUrl('flow-chart-icon.png') + "\" />\n        </div>\n    </div>\n  </div>");
});
//# sourceMappingURL=dropzoneUI.js.map