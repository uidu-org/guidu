import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import { Container } from 'unstated';
import { CONTENT_NAV_WIDTH } from '../common/constants';
var defaultState = {
  isPeekHinting: false,
  isPeeking: false,
  isResizing: false,
  isResizeDisabled: false,
  isCollapsed: false,
  productNavWidth: CONTENT_NAV_WIDTH
};

var UIController =
/*#__PURE__*/
function (_Container) {
  _inherits(UIController, _Container);

  function UIController(initialState, cache) {
    var _this;

    _classCallCheck(this, UIController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIController).call(this));
    _this.getCache = void 0;
    _this.setCache = void 0;
    _this.isCollapsedStore = void 0;

    _this.storeState = function (state) {
      _this.setState(state);

      var _this$state = _this.state,
          isCollapsed = _this$state.isCollapsed,
          productNavWidth = _this$state.productNavWidth;

      if (_this.setCache) {
        _this.setCache({
          isCollapsed: isCollapsed,
          productNavWidth: productNavWidth
        });
      }
    };

    _this.collapse = function () {
      if (_this.state.isResizeDisabled) {
        return;
      }

      _this.storeState({
        isCollapsed: true
      });
    };

    _this.expand = function () {
      if (_this.state.isResizeDisabled) {
        return;
      }

      _this.storeState({
        isCollapsed: false
      });
    };

    _this.toggleCollapse = function () {
      var toggle = _this.state.isCollapsed ? _this.expand : _this.collapse;
      toggle();
    };

    _this.manualResizeStart = function (_ref) {
      var productNavWidth = _ref.productNavWidth,
          isCollapsed = _ref.isCollapsed;

      if (_this.state.isResizeDisabled) {
        return;
      }

      _this.storeState({
        isResizing: true,
        productNavWidth: productNavWidth,
        isCollapsed: isCollapsed
      });
    };

    _this.manualResizeEnd = function (_ref2) {
      var productNavWidth = _ref2.productNavWidth,
          isCollapsed = _ref2.isCollapsed;

      if (_this.state.isResizeDisabled) {
        return;
      }

      _this.storeState({
        isResizing: false,
        productNavWidth: productNavWidth,
        isCollapsed: isCollapsed
      });
    };

    _this.enableResize = function () {
      var isCollapsed = typeof _this.isCollapsedStore === 'boolean' ? _this.isCollapsedStore : _this.state.isCollapsed; // This is a page-level setting not a user preference so we don't cache
      // this.

      _this.setState({
        isCollapsed: isCollapsed,
        isResizeDisabled: false
      });
    };

    _this.disableResize = function () {
      // Remember this so that we can reset it if resizing is enabled again.
      _this.isCollapsedStore = _this.state.isCollapsed; // This is a page-level setting not a user preference so we don't cache
      // this.

      _this.setState({
        isCollapsed: false,
        isResizeDisabled: true
      });
    };

    _this.peekHint = function () {
      _this.storeState({
        isPeekHinting: true
      });
    };

    _this.unPeekHint = function () {
      _this.storeState({
        isPeekHinting: false
      });
    };

    _this.togglePeekHint = function () {
      var toggle = _this.state.isPeekHinting ? _this.unPeekHint : _this.peekHint;
      toggle();
    };

    _this.peek = function () {
      _this.storeState({
        isPeeking: true
      });
    };

    _this.unPeek = function () {
      _this.storeState({
        isPeeking: false
      });
    };

    _this.togglePeek = function () {
      var toggle = _this.state.isPeeking ? _this.unPeek : _this.peek;
      toggle();
    };

    var cachedState = {};

    if (cache) {
      var get = cache.get,
          set = cache.set;
      var retrievedCache = get();

      if (retrievedCache) {
        var isCollapsed = retrievedCache.isCollapsed,
            productNavWidth = retrievedCache.productNavWidth;
        cachedState = {
          isCollapsed: isCollapsed,
          productNavWidth: productNavWidth
        };
      }

      _this.getCache = get;
      _this.setCache = set;
    }

    var _state = _objectSpread({}, defaultState, cachedState, initialState);

    var _isCollapsed = _state.isCollapsed; // isResizeDisabled takes precedence over isCollapsed

    if (initialState && initialState.isResizeDisabled) {
      // Remember this so that we can reset it if resizing is enabled again.
      _this.isCollapsedStore = _isCollapsed;
      _isCollapsed = false;
    }

    _this.state = _objectSpread({}, _state, {
      isCollapsed: _isCollapsed
    });
    return _this;
  }

  return UIController;
}(Container);

export { UIController as default };