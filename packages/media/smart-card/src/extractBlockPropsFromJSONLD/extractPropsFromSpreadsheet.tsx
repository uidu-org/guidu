import * as React from 'react';

import { BlockCardResolvedViewProps } from '@uidu/media-ui';
import { extractPropsFromDocument } from './extractPropsFromDocument';
import Spreadsheet24Icon from '@atlaskit/icon-file-type/glyph/spreadsheet/24';
import GoogleSheet24Icon from '@atlaskit/icon-file-type/glyph/google-sheet/24';
import ExcelSpreadsheet24Icon from '@atlaskit/icon-file-type/glyph/excel-spreadsheet/24';

export function extractPropsFromSpreadsheet(
  json: any,
): BlockCardResolvedViewProps {
  const props = extractPropsFromDocument(json);

  // We use vendor-specific variations of the icons, whenever possible
  if (json.fileFormat === 'application/vnd.google-apps.spreadsheet') {
    props.icon = (
      <GoogleSheet24Icon
        label={json.provider ? json.provider.name : 'Google Sheet'}
      />
    );
  } else if (json.fileFormat === 'application/vnd.ms-excel') {
    props.icon = (
      <ExcelSpreadsheet24Icon
        label={json.provider ? json.provider.name : 'MS Excel'}
      />
    );
  } else {
    props.icon = (
      <Spreadsheet24Icon
        label={json.provider ? json.provider.name : 'Spreadsheet'}
      />
    );
  }

  return props;
}
