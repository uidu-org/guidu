"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _unstated = require("unstated");

var defaultProps = {
  initialPeekViewId: null,
  isDebugEnabled: false
};

var ViewController =
/*#__PURE__*/
function (_Container) {
  (0, _inherits2.default)(ViewController, _Container);

  function ViewController() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultProps,
        initialPeekViewId = _ref.initialPeekViewId,
        _isDebugEnabled = _ref.isDebugEnabled;

    (0, _classCallCheck2.default)(this, ViewController);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ViewController).call(this));
    _this.state = {
      activeView: null,
      incomingView: null,
      activePeekView: null,
      incomingPeekView: null
    };
    _this.reducers = {};
    _this.views = {};
    _this.isDebugEnabled = false;
    _this.initialPeekViewId = null;

    _this._setViewInternals = function (stateKeys) {
      return function (viewId) {
        var updateViewController = _this._updateViewController(stateKeys);

        var incoming = stateKeys.incoming;
        var view = _this.views[viewId]; // The view has been added

        if (view) {
          var id = view.id,
              type = view.type,
              getItems = view.getItems;
          var returnedItems = getItems(); // This view returned a Promise

          if (returnedItems instanceof Promise) {
            // Enter a temporary loading state
            _this.setState((0, _defineProperty2.default)({}, incoming, {
              id: id,
              type: type
            })); // Wait for the Promise to resolve


            returnedItems.then(function (data) {
              updateViewController(view, data);
            });
            return;
          } // The view returned data


          updateViewController(view, returnedItems);
          return;
        } // The view has not been added yet. We enter an indefinite loading state
        // until the view is added or another view is set.


        _this.setState((0, _defineProperty2.default)({}, incoming, {
          id: viewId,
          type: null
        }));
      };
    };

    _this._updateViewController = function (stateKeys) {
      return function (view, initialData) {
        var _this$setState3;

        var active = stateKeys.active,
            incoming = stateKeys.incoming;
        var id = view.id,
            type = view.type,
            getAnalyticsAttributes = view.getAnalyticsAttributes;
        var reducers = _this.reducers[id] || [];
        var data = reducers.reduce(function (d, reducer) {
          return reducer(d);
        }, initialData);
        var analyticsAttributes = getAnalyticsAttributes ? getAnalyticsAttributes(data) : undefined;

        _this.setState((_this$setState3 = {}, (0, _defineProperty2.default)(_this$setState3, active, {
          id: id,
          type: type,
          data: data,
          analyticsAttributes: analyticsAttributes
        }), (0, _defineProperty2.default)(_this$setState3, incoming, null), _this$setState3));
      };
    };

    _this.addReducer = function (viewId, reducer) {
      var reducersForView = (0, _toConsumableArray2.default)(_this.reducers[viewId] || []).concat([reducer]);
      _this.reducers = (0, _objectSpread5.default)({}, _this.reducers, (0, _defineProperty2.default)({}, viewId, reducersForView)); // If we're adding a reducer to the active view we'll want to force an
      // update so that the reducer gets applied.

      _this.updateActiveView(viewId);
    };

    _this.removeReducer = function (viewId, reducer) {
      var reducersForView = _this.reducers[viewId];

      if (!reducersForView) {
        return;
      }

      var newReducers = reducersForView.filter(function (r) {
        return r !== reducer;
      });
      _this.reducers = (0, _objectSpread5.default)({}, _this.reducers, (0, _defineProperty2.default)({}, viewId, newReducers)); // If we're removing a reducer from the active view we'll want to force an
      // update so that the data gets re-evaluated.

      _this.updateActiveView(viewId);
    };

    _this.addView = function (view) {
      var id = view.id;
      _this.views = (0, _objectSpread5.default)({}, _this.views, (0, _defineProperty2.default)({}, id, view)); // We need to call setView or setPeekView again for the following cases:
      // 1. The added view matches the active view (if it returns a Promise we
      //    want to temporarily enter a loading state while it resolves).
      // 2. The added view matches the expected incoming view and we want to
      //    resolve it.

      var _this$state = _this.state,
          activeView = _this$state.activeView,
          incomingView = _this$state.incomingView,
          activePeekView = _this$state.activePeekView,
          incomingPeekView = _this$state.incomingPeekView;

      if (activeView && id === activeView.id || incomingView && id === incomingView.id) {
        _this.setView(id);
      }

      if (activePeekView && id === activePeekView.id || incomingPeekView && id === incomingPeekView.id) {
        _this.setPeekView(id);
      }
    };

    _this.removeView = function (viewId) {
      delete _this.views[viewId];
    };

    _this.setView = _this._setViewInternals({
      active: 'activeView',
      incoming: 'incomingView'
    });
    _this.setPeekView = _this._setViewInternals({
      active: 'activePeekView',
      incoming: 'incomingPeekView'
    });

    _this.setInitialPeekViewId = function (viewId) {
      _this.initialPeekViewId = viewId;

      _this.setPeekView(viewId);
    };

    _this.updateActiveView = function (maybeViewId) {
      var activeView = _this.state.activeView;

      if (!activeView) {
        return;
      }

      if (maybeViewId && maybeViewId === activeView.id) {
        _this.setView(maybeViewId);

        return;
      }

      if (!maybeViewId) {
        _this.setView(activeView.id);
      }
    };

    _this.setIsDebugEnabled = function (isDebugEnabled) {
      _this.isDebugEnabled = isDebugEnabled;
    };

    if (typeof _isDebugEnabled !== 'undefined') {
      _this.isDebugEnabled = _isDebugEnabled;
    }

    if (initialPeekViewId) {
      _this.setInitialPeekViewId(initialPeekViewId);
    }

    return _this;
  }
  /**
   * DRY function for setting a view. Can be configured to set either the active
   * view, or the active peek view.
   */


  return ViewController;
}(_unstated.Container);

exports.default = ViewController;
module.exports = exports.default;