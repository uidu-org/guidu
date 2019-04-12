import * as tslib_1 from "tslib";
import * as React from 'react';
import { Observable } from 'rxjs';
import { List } from '../../../newgen/list';
import { ErrorMessage } from '../../../newgen/error';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import { ItemViewer } from '../../../newgen/item-viewer';
import Button from '@uidu/button';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
function createFixture(props) {
    var items = [];
    var selectedItem = {
        id: '',
        occurrenceKey: '',
        mediaItemType: 'file',
    };
    var context = {
        file: {
            getFileState: function () {
                return Observable.of({
                    id: '123',
                    mediaType: 'image',
                    status: 'processed',
                });
            },
        },
    };
    var el = mountWithIntlContext(React.createElement(List, tslib_1.__assign({ items: items, defaultSelectedItem: selectedItem, context: context }, props)));
    return el;
}
describe('<List />', function () {
    var identifier = {
        id: 'some-id',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
    };
    it('should update navigation', function () {
        var identifier2 = {
            id: 'some-id-2',
            occurrenceKey: 'some-custom-occurrence-key',
            mediaItemType: 'file',
        };
        var el = createFixture({
            items: [identifier, identifier2],
            defaultSelectedItem: identifier,
        });
        expect(el.state().selectedItem).toMatchObject({ id: 'some-id' });
        el.find(ArrowRightCircleIcon).simulate('click');
        expect(el.state().selectedItem).toMatchObject({ id: 'some-id-2' });
    });
    it('should show an error if selected item is not found in the list', function () {
        var list = [
            {
                id: 'some-id',
                occurrenceKey: 'some-custom-occurrence-key',
                mediaItemType: 'file',
            },
        ];
        var defaultSelectedItem = {
            id: 'some-id-2',
            occurrenceKey: 'some-custom-occurrence-key',
            mediaItemType: 'file',
        };
        var el = createFixture({ items: list, defaultSelectedItem: defaultSelectedItem });
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain('The selected item was not found on the list.');
        expect(errorMessage.find(Button)).toHaveLength(0);
    });
    it('should show controls when navigation occurs', function () {
        var showControls = jest.fn();
        var el = createFixture({
            items: [identifier, identifier, identifier],
            defaultSelectedItem: identifier,
            showControls: showControls,
        });
        el.find(ArrowRightCircleIcon).simulate('click');
        el.find(ArrowRightCircleIcon).simulate('click');
        expect(showControls).toHaveBeenCalledTimes(2);
    });
    describe('AutoPlay', function () {
        it('should pass ItemViewer an initial previewCount value of zero', function () {
            var showControls = jest.fn();
            var el = createFixture({
                items: [identifier, identifier, identifier],
                defaultSelectedItem: identifier,
                showControls: showControls,
            });
            var itemViewer = el.find(ItemViewer);
            expect(itemViewer.prop('previewCount')).toEqual(0);
        });
        it("should increase ItemViewer's previewCount on navigation", function () {
            var showControls = jest.fn();
            var el = createFixture({
                items: [identifier, identifier, identifier],
                defaultSelectedItem: identifier,
                showControls: showControls,
            });
            el.find(ArrowRightCircleIcon).simulate('click');
            var itemViewer = el.find(ItemViewer);
            expect(itemViewer.prop('previewCount')).toEqual(1);
        });
    });
});
//# sourceMappingURL=list.spec.js.map