import * as tslib_1 from "tslib";
import { IntlProvider } from 'react-intl';
import { LocalUploadComponent } from '../localUpload';
import { whenDomReady } from '../../util/documentReady';
import dropzoneUI from './dropzoneUI';
var toArray = function (arr) { return [].slice.call(arr, 0); };
var DropzoneImpl = /** @class */ (function (_super) {
    tslib_1.__extends(DropzoneImpl, _super);
    function DropzoneImpl(context, config) {
        if (config === void 0) { config = { uploadParams: {} }; }
        var _this = _super.call(this, context, config) || this;
        _this.onFileDropped = function (dragEvent) {
            if (!dragEvent.dataTransfer) {
                return;
            }
            dragEvent.preventDefault();
            dragEvent.stopPropagation();
            _this.onDrop(dragEvent);
            var filesArray = [].slice.call(dragEvent.dataTransfer.files);
            _this.uploadService.addFiles(filesArray);
        };
        _this.onDragOver = function (e) {
            e.preventDefault();
            if (_this.instance && e.dataTransfer && DropzoneImpl.dragContainsFiles(e)) {
                var dataTransfer = e.dataTransfer;
                var allowed = void 0;
                try {
                    allowed = dataTransfer.effectAllowed;
                }
                catch (e) { } // the error is expected in IE11
                dataTransfer.dropEffect =
                    'move' === allowed || 'linkMove' === allowed ? 'move' : 'copy';
                _this.instance.classList.add('active');
                var length_1 = _this.getDraggedItemsLength(dataTransfer);
                _this.emitDragOver({ length: length_1 });
            }
        };
        _this.onDragLeave = function (e) {
            if (_this.instance && e.dataTransfer) {
                e.preventDefault();
                _this.instance.classList.remove('active');
                var length_2 = 0;
                if (DropzoneImpl.dragContainsFiles(e)) {
                    var dataTransfer = e.dataTransfer;
                    length_2 = _this.getDraggedItemsLength(dataTransfer);
                }
                _this.emitDragLeave({ length: length_2 });
            }
        };
        _this.onDrop = function (e) {
            var instance = _this.instance;
            if (instance && e.dataTransfer && DropzoneImpl.dragContainsFiles(e)) {
                instance.classList.remove('active');
                var dataTransfer = e.dataTransfer;
                var length_3 = _this.getDraggedItemsLength(dataTransfer);
                _this.emit('drop', undefined);
                _this.emitDragLeave({ length: length_3 });
            }
        };
        var container = config.container, headless = config.headless, proxyReactContext = config.proxyReactContext;
        _this.container = container || document.body;
        _this.headless = headless || false;
        _this.uiActive = false;
        _this.proxyReactContext = proxyReactContext;
        return _this;
    }
    DropzoneImpl.prototype.activate = function () {
        var _this = this;
        return whenDomReady
            .then(function () {
            _this.container = _this.container || document.body;
            if (!_this.instance) {
                return _this.createInstance();
            }
        })
            .then(function () {
            _this.deactivate(); // in case we call activate twice in a row
            _this.container.addEventListener('dragover', _this.onDragOver, false);
            _this.container.addEventListener('dragleave', _this.onDragLeave, false);
            _this.addDropzone();
        });
    };
    DropzoneImpl.prototype.deactivate = function () {
        this.container.removeEventListener('dragover', this.onDragOver, false);
        this.container.removeEventListener('dragleave', this.onDragLeave, false);
        this.removeDropzone();
    };
    DropzoneImpl.prototype.addDropzone = function () {
        this.container.addEventListener('drop', this.onFileDropped);
    };
    DropzoneImpl.prototype.removeDropzone = function () {
        this.container.removeEventListener('drop', this.onFileDropped);
    };
    // Cross-browser way of getting dragged items length, we prioritize "items" if present
    // https://www.w3.org/TR/html51/editing.html#the-datatransfer-interface
    // This method is used on 'dragover' and we have no way to retrieve FileSystemFileEntry,
    // which contains info about if the dropped item is a file or directory. That info is only
    // available on 'drop'
    DropzoneImpl.prototype.getDraggedItemsLength = function (dataTransfer) {
        if (dataTransfer.items) {
            var items = toArray(dataTransfer.items);
            return items.filter(function (i) { return i.kind === 'file'; }).length;
        }
        // This is required for IE11
        return dataTransfer.files.length;
    };
    DropzoneImpl.prototype.createInstance = function () {
        this.instance = this.getDropzoneUI();
        this.container.appendChild(this.instance);
    };
    DropzoneImpl.prototype.getDropzoneUI = function () {
        if (this.headless) {
            var container = document.createElement('DIV');
            container.classList.add('headless-dropzone');
            return container;
        }
        else {
            if (this.proxyReactContext && this.proxyReactContext.intl) {
                var formatMessage = this.proxyReactContext.intl.formatMessage;
                return dropzoneUI(formatMessage);
            }
            var defaultFormatMessage = new IntlProvider({
                locale: 'en',
            }).getChildContext().intl.formatMessage;
            return dropzoneUI(defaultFormatMessage);
        }
    };
    DropzoneImpl.prototype.emitDragOver = function (e) {
        if (!this.uiActive) {
            this.uiActive = true;
            this.emit('drag-enter', e);
        }
    };
    DropzoneImpl.prototype.emitDragLeave = function (payload) {
        var _this = this;
        if (this.uiActive) {
            this.uiActive = false;
            /*
             when drag over child elements, container will issue dragleave and then dragover immediately.
             The 50ms timeout will prevent from issuing that "false" dragleave event
             */
            window.setTimeout(function () {
                if (!_this.uiActive) {
                    _this.emit('drag-leave', payload);
                }
            }, 50);
        }
    };
    DropzoneImpl.dragContainsFiles = function (event) {
        if (!event.dataTransfer) {
            return false;
        }
        var types = event.dataTransfer.types;
        return toArray(types).indexOf('Files') > -1;
    };
    return DropzoneImpl;
}(LocalUploadComponent));
export { DropzoneImpl };
//# sourceMappingURL=index.js.map