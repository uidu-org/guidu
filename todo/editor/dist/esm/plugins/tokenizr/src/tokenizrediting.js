import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import TokenizrCommand from './tokenizrcommand';

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
  _inherits(TokenizrEditing, _Plugin);

  function TokenizrEditing(editor) {
    var _this;

    _classCallCheck(this, TokenizrEditing);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TokenizrEditing).call(this, editor));
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

  _createClass(TokenizrEditing, [{
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
      conversion.for('upcast').add(upcastElementToElement({
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

      commands.add('tokenizr', new TokenizrCommand(editor));
    }
  }], [{
    key: "requires",
    get: function get() {
      return [];
    }
  }]);

  return TokenizrEditing;
}(Plugin);

export { TokenizrEditing as default };