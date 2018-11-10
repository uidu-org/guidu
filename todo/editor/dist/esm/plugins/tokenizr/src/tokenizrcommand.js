import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import Command from '@ckeditor/ckeditor5-core/src/command';

var HeadingCommand =
/*#__PURE__*/
function (_Command) {
  _inherits(HeadingCommand, _Command);

  function HeadingCommand(editor, modelElements) {
    var _this;

    _classCallCheck(this, HeadingCommand);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeadingCommand).call(this, editor));
    _this.modelElements = modelElements;
    return _this;
  }

  _createClass(HeadingCommand, [{
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
}(Command);

export { HeadingCommand as default };