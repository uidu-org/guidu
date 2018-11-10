import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { getLocalizedOptions } from './utils';

var HeadingUI =
/*#__PURE__*/
function (_Plugin) {
  _inherits(HeadingUI, _Plugin);

  function HeadingUI() {
    _classCallCheck(this, HeadingUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeadingUI).apply(this, arguments));
  }

  _createClass(HeadingUI, [{
    key: "init",

    /**
     * @inheritDoc
     */
    value: function init() {
      var _this = this;

      var editor = this.editor;
      var t = editor.t;
      var options = getLocalizedOptions(editor);
      var defaultTitle = t('Choose tokenizr');
      var dropdownTooltip = t('Tokenizr');
      editor.editing.view.addObserver(ClickObserver);
      editor.editing.view.on('click', function (evt, data) {
        console.log(evt);
        console.log(data.target); // -> engine.view.Element
      }); // Register UI component.

      editor.ui.componentFactory.add('tokenizr', function (locale) {
        var titles = {};
        var itemDefinitions = new Collection();
        var tokenizrCommand = editor.commands.get('tokenizr');
        var commands = [tokenizrCommand];
        options.map(function (option) {
          var def = {
            type: 'button',
            model: new Model({
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
        var dropdownView = createDropdown(locale);
        addListToDropdown(dropdownView, itemDefinitions);
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
}(Plugin);

export { HeadingUI as default };