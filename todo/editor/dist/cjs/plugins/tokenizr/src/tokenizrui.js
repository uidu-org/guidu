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

var _model = _interopRequireDefault(require("@ckeditor/ckeditor5-ui/src/model"));

var _utils = require("@ckeditor/ckeditor5-ui/src/dropdown/utils");

var _collection = _interopRequireDefault(require("@ckeditor/ckeditor5-utils/src/collection"));

var _utils2 = require("./utils");

var HeadingUI =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2.default)(HeadingUI, _Plugin);

  function HeadingUI() {
    (0, _classCallCheck2.default)(this, HeadingUI);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HeadingUI).apply(this, arguments));
  }

  (0, _createClass2.default)(HeadingUI, [{
    key: "init",

    /**
     * @inheritDoc
     */
    value: function init() {
      var _this = this;

      var editor = this.editor;
      var t = editor.t;
      var options = (0, _utils2.getLocalizedOptions)(editor);
      var defaultTitle = t('Choose tokenizr');
      var dropdownTooltip = t('Tokenizr');
      editor.editing.view.addObserver(_clickobserver.default);
      editor.editing.view.on('click', function (evt, data) {
        console.log(evt);
        console.log(data.target); // -> engine.view.Element
      }); // Register UI component.

      editor.ui.componentFactory.add('tokenizr', function (locale) {
        var titles = {};
        var itemDefinitions = new _collection.default();
        var tokenizrCommand = editor.commands.get('tokenizr');
        var commands = [tokenizrCommand];
        options.map(function (option) {
          var def = {
            type: 'button',
            model: new _model.default({
              id: option.id,
              label: option.name,
              class: option.class,
              withText: true
            })
          }; // def.model.bind('isOn').to(tokenizrCommand, 'value', value => {
          //   return value && value.id === option.id;
          // });

          def.model.set({
            commandName: 'tokenizr',
            commandValue: option.id
          });
          itemDefinitions.add(def);
          titles[option.model] = option.title;
          return true;
        });
        var dropdownView = (0, _utils.createDropdown)(locale);
        (0, _utils.addListToDropdown)(dropdownView, itemDefinitions);
        dropdownView.buttonView.set({
          isOn: false,
          withText: true,
          tooltip: dropdownTooltip
        });
        dropdownView.extendTemplate({
          attributes: {
            class: ['ck-tokenizr-dropdown']
          }
        });
        dropdownView.bind('isEnabled').toMany(commands, 'isEnabled', function () {
          for (var _len = arguments.length, areEnabled = new Array(_len), _key = 0; _key < _len; _key++) {
            areEnabled[_key] = arguments[_key];
          }

          return areEnabled.some(function (isEnabled) {
            return isEnabled;
          });
        });
        dropdownView.buttonView.bind('label').to(tokenizrCommand, 'value', function (value) {
          return titles[value] ? titles[value] : defaultTitle;
        }); // Execute command when an item from the dropdown is selected.

        _this.listenTo(dropdownView, 'execute', function (evt) {
          editor.execute(evt.source.commandName, evt.source.commandValue ? options.filter(function (o) {
            return o.id === evt.source.commandValue;
          })[0] : undefined);
          editor.editing.view.focus();
        });

        return dropdownView;
      });
    }
  }]);
  return HeadingUI;
}(_plugin.default);

exports.default = HeadingUI;
module.exports = exports.default;