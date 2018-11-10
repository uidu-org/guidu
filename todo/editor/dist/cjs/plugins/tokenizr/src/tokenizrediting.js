"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _plugin = _interopRequireDefault(require("@ckeditor/ckeditor5-core/src/plugin"));

var _clickobserver = _interopRequireDefault(require("@ckeditor/ckeditor5-engine/src/view/observer/clickobserver"));

var _upcastConverters = require("@ckeditor/ckeditor5-engine/src/conversion/upcast-converters");

var _tokenizrcommand = _interopRequireDefault(require("./tokenizrcommand"));

var tokenizrAttributes = function tokenizrAttributes(element) {
  return {
    class: element.getAttribute('class'),
    'data-id': element.getAttribute('data-id'),
    'data-name': element.getAttribute('data-name'),
    'data-widget': 'tokenizr'
  };
};

var createTokenizrElement = function createTokenizrElement(modelElement, viewWriter) {
  return viewWriter && viewWriter.createContainerElement('span', tokenizrAttributes(modelElement));
};

var TokenizrEditing =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2.default)(TokenizrEditing, _Plugin);

  function TokenizrEditing(editor) {
    var _this;

    (0, _classCallCheck2.default)(this, TokenizrEditing);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TokenizrEditing).call(this, editor));
    editor.config.define('tokenizr', {
      options: [{
        'data-widget': 'tokenizr',
        id: 'h2',
        name: 'Heading 1',
        class: 'ck-tokenizr badge badge-primary badge-pill'
      }, {
        'data-widget': 'tokenizr',
        id: 'h3',
        name: 'Heading 2',
        class: 'ck-tokenizr badge badge-primary badge-pill'
      }, {
        'data-widget': 'tokenizr',
        id: 'h4',
        name: 'Heading 3',
        class: 'ck-tokenizr badge badge-primary badge-pill'
      }]
    });
    return _this;
  }

  (0, _createClass2.default)(TokenizrEditing, [{
    key: "init",
    value: function init() {
      var editor = this.editor;
      var model = editor.model,
          conversion = editor.conversion,
          commands = editor.commands;
      var schema = model.schema;
      schema.register('tokenizr', {
        isObject: true,
        isBlock: true,
        allowWhere: '$block',
        allowIn: '$block',
        inheritAllFrom: '$block'
      });
      conversion.elementToElement({
        model: 'tokenizr',
        view: createTokenizrElement
      });
      conversion.for('upcast').add((0, _upcastConverters.upcastElementToElement)({
        view: {
          name: 'span',
          attributes: {
            'data-widget': 'tokenizr'
          }
        },
        model: function model(viewElement, modelWriter) {
          return modelWriter.createElement('tokenizr', tokenizrAttributes(viewElement));
        }
      })); // Register the tokenizr command for this option.

      commands.add('tokenizr', new _tokenizrcommand.default(editor));
    }
  }], [{
    key: "requires",
    get: function get() {
      return [];
    }
  }]);
  return TokenizrEditing;
}(_plugin.default);

exports.default = TokenizrEditing;
module.exports = exports.default;