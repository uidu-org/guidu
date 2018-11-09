"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _swiper = _interopRequireDefault(require("swiper/dist/js/swiper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slider =
/*#__PURE__*/
function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "prev", function () {
      return _this.mySlider.slidePrev();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "next", function () {
      return _this.mySlider.slideNext();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "to", function (index) {
      return _this.mySlider.slideTo(index);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function () {
      return _this.mySlider.update(true);
    });

    return _this;
  }

  _createClass(Slider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var options = this.props.options;

      var defaultOptions = _objectSpread({}, Slider.defaultProps.options, options);

      this.mySlider = new _swiper.default(this.slider, defaultOptions);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this$props = this.props,
          children = _this$props.children,
          slideClassName = _this$props.slideClassName;
      return _react.Children.map(children, function (child, index) {
        if (child) {
          return _react.default.createElement("div", {
            key: index,
            className: (0, _classnames.default)('swiper-slide', slideClassName)
          }, (0, _react.cloneElement)(child, {}));
        }

        return null;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          pagination = _this$props2.pagination,
          navigation = _this$props2.navigation,
          scrollbar = _this$props2.scrollbar;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('swiper-container', className),
        ref: function ref(c) {
          _this2.slider = c;
        }
      }, _react.default.createElement("div", {
        className: "swiper-wrapper"
      }, this.renderChildren()), pagination && _react.default.createElement("div", {
        className: "swiper-pagination"
      }), navigation && _react.default.createElement("div", {
        className: "swiper-button-prev"
      }), navigation && _react.default.createElement("div", {
        className: "swiper-button-next"
      }), scrollbar && _react.default.createElement("div", {
        className: "swiper-scrollbar"
      }));
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;
Slider.defaultProps = {
  className: '',
  slideClassName: '',
  pagination: false,
  navigation: false,
  scrollbar: false,
  options: {
    direction: 'horizontal',
    initialSlide: 0,
    slidesPerView: 1,
    keyboard: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true
    },
    spaceBetween: 16,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    centeredSlides: false,
    onSlideChangeEnd: function onSlideChangeEnd() {} // breakpoints: {
    //   // when window width is <= 480px
    //   480: {
    //     noSwiping: false,
    //     slidesPerView: 1.2,
    //   },
    // },

  }
};
Slider.propTypes = {
  className: _propTypes.default.string,
  slideClassName: _propTypes.default.string,
  children: _propTypes.default.node.isRequired,
  options: _propTypes.default.shape(_propTypes.default.obj),
  pagination: _propTypes.default.bool,
  navigation: _propTypes.default.bool,
  scrollbar: _propTypes.default.bool
};
module.exports = exports.default;