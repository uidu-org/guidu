import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { parseHTML } from '../../util/parseHTML';
import { wrapperStyles } from './styled';
import { getAssetUrl } from '../../util/getAssetUrl';

// TODO [MSW-385]: Remove template string and use React
export default (
  formatMessage: (
    messageDescriptor: FormattedMessage.MessageDescriptor,
  ) => string,
) =>
  parseHTML(
    `<div class="mediaPickerDropzone">
    <style>${wrapperStyles}</style>
    <div class="mp-content">
        <div class="mp-circle">
            <div class="mp-text">
                <span class="mp-title">${formatMessage(
                  messages.drop_your_files_here,
                )}</span>
                <span class="mp-description">${formatMessage(
                  messages.share_files_instantly,
                )}</span>
            </div>
            <img class="mp-fileIcon mp-iconAtlassianDoc" src="${getAssetUrl(
              'pie-chart-icon.png',
            )}"/>
            <img class="mp-fileIcon mp-iconOtherDoc" src="${getAssetUrl(
              'line-graph-icon.png',
            )}" />
            <img class="mp-fileIcon mp-iconPageSpreadsheet" src="${getAssetUrl(
              'flow-chart-icon.png',
            )}" />
        </div>
    </div>
  </div>`,
  );
