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

var _command = _interopRequireDefault(require("@ckeditor/ckeditor5-core/src/command"));

var HeadingCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inherits2.default)(HeadingCommand, _Command);

  function HeadingCommand(editor, modelElements) {
    var _this;

    (0, _classCallCheck2.default)(this, HeadingCommand);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HeadingCommand).call(this, editor));
    _this.modelElements = modelElements;
    return _this;
  }

  (0, _createClass2.default)(HeadingCommand, [{
    key: "refresh",
    value: function refresh() {
      this.isEnabled = true;
    }
  }, {
    key: "execute",
    value: function execute(option) {
      var model = this.editor.model;
      var document = model.document;
      var selection = document.selection;
      model.change(function (writer) {
        var position = selection.getLastPosition();

        if (option) {
          var tokenizr = writer.createElement('tokenizr', {
            class: option.class,
            'data-id': option.id,
            'data-name': option.name,
            'data-widget': 'tokenizr'
          });
          writer.insert(tokenizr, position);
          writer.insertText(' ', tokenizr, 'after');
        }
      });
    }
  }]);
  return HeadingCommand;
}(_command.default);

exports.default = HeadingCommand;
module.exports = exports.default;