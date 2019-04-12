import * as tslib_1 from "tslib";
import * as React from 'react';
import Button from '@uidu/button';
import { BaseViewer } from '../../../../newgen/viewers/base-viewer';
import { createContext } from '../../_stubs';
import { Outcome } from '../../../../newgen/domain';
import { createError, ErrorMessage, } from '../../../../newgen/error';
import { Spinner } from '../../../../newgen/loading';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
function createItem() {
    return {
        id: 'some-id',
        status: 'processed',
        name: 'my image',
        size: 11222,
        mediaType: 'image',
        mimeType: 'jpeg',
        artifacts: {},
    };
}
function createProps() {
    var item = createItem();
    var context = createContext();
    var collectionName = 'test-collection';
    return { item: item, context: context, collectionName: collectionName };
}
function createInitialState() {
    return {
        content: Outcome.pending(),
    };
}
function createTestViewer(props) {
    var initSpy = jest.fn();
    var releaseSpy = jest.fn();
    var renderSuccessfulSpy = jest.fn(function (content) { return (React.createElement("div", null, content)); });
    var TestViewer = /** @class */ (function (_super) {
        tslib_1.__extends(TestViewer, _super);
        function TestViewer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.init = initSpy;
            _this.release = releaseSpy;
            _this.renderSuccessful = renderSuccessfulSpy;
            return _this;
        }
        Object.defineProperty(TestViewer.prototype, "initialState", {
            get: function () {
                return createInitialState();
            },
            enumerable: true,
            configurable: true
        });
        return TestViewer;
    }(BaseViewer));
    var el = mountWithIntlContext(React.createElement(TestViewer, tslib_1.__assign({}, props)));
    return { el: el, initSpy: initSpy, releaseSpy: releaseSpy, renderSuccessfulSpy: renderSuccessfulSpy };
}
describe('BaseViewer', function () {
    it('calls init() when component is mounted', function () {
        var initSpy = createTestViewer(createProps()).initSpy;
        expect(initSpy).toHaveBeenCalledTimes(1);
    });
    it('calls release() when component is unmounted', function () {
        var _a = createTestViewer(createProps()), el = _a.el, releaseSpy = _a.releaseSpy;
        el.unmount();
        expect(releaseSpy).toHaveBeenCalledTimes(1);
    });
    it('calls release(), then init() when item was updated', function () {
        var _a = createTestViewer(createProps()), el = _a.el, initSpy = _a.initSpy, releaseSpy = _a.releaseSpy;
        var newItem = tslib_1.__assign({}, createItem(), { id: 'new-id' });
        el.setProps({ item: newItem });
        expect(releaseSpy).toHaveBeenCalledTimes(1);
        expect(initSpy).toHaveBeenCalledTimes(2);
    });
    it('calls release(), then init() when context was updated', function () {
        var _a = createTestViewer(createProps()), el = _a.el, initSpy = _a.initSpy, releaseSpy = _a.releaseSpy;
        el.setProps({ context: createContext() });
        expect(releaseSpy).toHaveBeenCalledTimes(1);
        expect(initSpy).toHaveBeenCalledTimes(2);
    });
    it('calls release(), then init() when collectionName was updated', function () {
        var _a = createTestViewer(createProps()), el = _a.el, initSpy = _a.initSpy, releaseSpy = _a.releaseSpy;
        el.setProps({ collectionName: 'another-collection-name' });
        expect(releaseSpy).toHaveBeenCalledTimes(1);
        expect(initSpy).toHaveBeenCalledTimes(2);
    });
    it('sets the initialState when component is mounted', function () {
        var el = createTestViewer(createProps()).el;
        expect(el.state()).toMatchObject(createInitialState());
    });
    it('resets the component to the initialState when properties were updated', function () {
        var el = createTestViewer(createProps()).el;
        el.setState({ content: Outcome.successful('test') });
        el.setProps({ context: createContext() });
        expect(el.state()).toMatchObject(createInitialState());
    });
    it('renders a spinner while the content is pending', function () {
        var el = createTestViewer(createProps()).el;
        expect(el.find(Spinner)).toHaveLength(1);
    });
    it('invokes renderSuccessful() when the content loading was successful', function () {
        var _a = createTestViewer(createProps()), el = _a.el, renderSuccessfulSpy = _a.renderSuccessfulSpy;
        var content = Outcome.successful('test');
        el.setState({ content: content });
        expect(el.text()).toEqual('test');
        expect(renderSuccessfulSpy).toHaveBeenCalled();
    });
    it('renders an error message when the content loading has failed', function () {
        var el = createTestViewer(createProps()).el;
        var content = Outcome.failed(createError('previewFailed'));
        el.setState({ content: content });
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain("We couldn't generate a preview for this file");
        // download button
        expect(errorMessage.text()).toContain('Try downloading the file to view it');
        expect(errorMessage.find(Button)).toHaveLength(1);
    });
});
//# sourceMappingURL=base-viewer.spec.js.map