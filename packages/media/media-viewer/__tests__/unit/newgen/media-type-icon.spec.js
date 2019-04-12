import * as React from 'react';
import { mount } from 'enzyme';
import UnknownIcon from '@atlaskit/icon/glyph/media-services/unknown';
import { MediaTypeIcon } from '../../../newgen/media-type-icon';
describe('MediaTypeIcon', function () {
    it('MSW-741: should render the unknown icon for unexpected media types', function () {
        var el = mount(React.createElement(MediaTypeIcon, { type: 'unexpected-type' }));
        expect(el.find(UnknownIcon)).toHaveLength(1);
    });
});
//# sourceMappingURL=media-type-icon.spec.js.map