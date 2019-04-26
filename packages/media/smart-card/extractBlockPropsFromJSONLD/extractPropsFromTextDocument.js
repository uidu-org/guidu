import * as React from 'react';
import { extractPropsFromDocument } from './extractPropsFromDocument';
import Document24Icon from '@atlaskit/icon-file-type/glyph/document/24';
import GoogleDoc24Icon from '@atlaskit/icon-file-type/glyph/google-sheet/24';
import WordDocument24Icon from '@atlaskit/icon-file-type/glyph/word-document/24';
export function extractPropsFromTextDocument(json) {
    var props = extractPropsFromDocument(json);
    // We use vendor-specific variations of the icons, whenever possible
    if (json.fileFormat === 'application/vnd.google-apps.document') {
        props.icon = (React.createElement(GoogleDoc24Icon, { label: json.provider ? json.provider.name : 'Google Doc' }));
    }
    else if (json.fileFormat === 'application/vnd.ms-word') {
        props.icon = (React.createElement(WordDocument24Icon, { label: json.provider ? json.provider.name : 'MS Word' }));
    }
    else {
        props.icon = (React.createElement(Document24Icon, { label: json.provider ? json.provider.name : 'Text document' }));
    }
    return props;
}
//# sourceMappingURL=extractPropsFromTextDocument.js.map