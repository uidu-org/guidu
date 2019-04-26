import * as tslib_1 from "tslib";
import { ContextFactory } from '@uidu/media-core';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import * as exenv from 'exenv';
import App from '../popup/components/app';
import { cancelUpload } from '../popup/actions/cancelUpload';
import { showPopup } from '../popup/actions/showPopup';
import { resetView } from '../popup/actions/resetView';
import { getFilesInRecents } from '../popup/actions/getFilesInRecents';
import { hidePopup } from '../popup/actions/hidePopup';
import { createStore } from '../store';
import { UploadComponent } from './component';
import { defaultUploadParams } from '../domain/uploadParams';
var PopupImpl = /** @class */ (function (_super) {
    tslib_1.__extends(PopupImpl, _super);
    function PopupImpl(tenantContext, _a) {
        var _b = _a.container, container = _b === void 0 ? exenv.canUseDOM ? document.body : undefined : _b, uploadParams = _a.uploadParams, // tenant
        proxyReactContext = _a.proxyReactContext, singleSelect = _a.singleSelect;
        var _this = _super.call(this) || this;
        _this.tenantContext = tenantContext;
        _this.proxyReactContext = proxyReactContext;
        var _c = tenantContext.config, userAuthProvider = _c.userAuthProvider, cacheSize = _c.cacheSize;
        if (!userAuthProvider) {
            throw new Error('When using Popup media picker userAuthProvider must be provided in the context');
        }
        var userContext = ContextFactory.create({
            cacheSize: cacheSize,
            authProvider: userAuthProvider,
        });
        var tenantUploadParams = tslib_1.__assign({}, defaultUploadParams, uploadParams);
        _this.store = createStore(_this, tenantContext, userContext, {
            proxyReactContext: proxyReactContext,
            singleSelect: singleSelect,
            uploadParams: tenantUploadParams,
        });
        _this.tenantUploadParams = tenantUploadParams;
        var popup = _this.renderPopup();
        if (!popup) {
            return _this;
        }
        _this.container = popup;
        if (container) {
            container.appendChild(popup);
        }
        return _this;
    }
    PopupImpl.prototype.show = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch;
            return tslib_1.__generator(this, function (_a) {
                dispatch = this.store.dispatch;
                dispatch(resetView());
                dispatch(getFilesInRecents());
                dispatch(showPopup());
                return [2 /*return*/];
            });
        });
    };
    PopupImpl.prototype.cancel = function (uniqueIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!uniqueIdentifier) {
                            return [2 /*return*/];
                        }
                        _b = (_a = this.store).dispatch;
                        _c = cancelUpload;
                        _d = {};
                        return [4 /*yield*/, uniqueIdentifier];
                    case 1:
                        _b.apply(_a, [_c.apply(void 0, [(_d.tenantUploadId = _e.sent(), _d)])]);
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupImpl.prototype.teardown = function () {
        if (!this.container) {
            return;
        }
        unmountComponentAtNode(this.container);
    };
    PopupImpl.prototype.hide = function () {
        this.store.dispatch(hidePopup());
    };
    PopupImpl.prototype.setUploadParams = function (uploadParams) {
        this.tenantUploadParams = tslib_1.__assign({}, defaultUploadParams, uploadParams);
    };
    PopupImpl.prototype.emitClosed = function () {
        this.emit('closed', undefined);
    };
    PopupImpl.prototype.renderPopup = function () {
        if (!exenv.canUseDOM) {
            return;
        }
        var container = document.createElement('div');
        render(React.createElement(App, { store: this.store, proxyReactContext: this.proxyReactContext, tenantUploadParams: this.tenantUploadParams }), container);
        return container;
    };
    return PopupImpl;
}(UploadComponent));
export { PopupImpl };
//# sourceMappingURL=popup.js.map