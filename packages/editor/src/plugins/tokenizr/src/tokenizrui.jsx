import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import {
  createDropdown,
  addListToDropdown,
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { getLocalizedOptions } from './utils';

export default class HeadingUI extends Plugin {
  /**
   * @inheritDoc
   */
  init() {
    const { editor } = this;
    const { t } = editor;
    const options = getLocalizedOptions(editor);
    const defaultTitle = t('Choose tokenizr');
    const dropdownTooltip = t('Tokenizr');

    editor.editing.view.addObserver(ClickObserver);
    editor.editing.view.on('click', (evt, data) => {
      console.log(evt);
      console.log(data.target); // -> engine.view.Element
    });

    // Register UI component.
    editor.ui.componentFactory.add('tokenizr', locale => {
      const titles = {};
      const itemDefinitions = new Collection();

      const tokenizrCommand = editor.commands.get('tokenizr');

      const commands = [tokenizrCommand];

      options.map(option => {
        const def = {
          type: 'button',
          model: new Model({
            id: option.id,
            label: option.name,
            class: option.class,
            withText: true,
          }),
        };

        // def.model.bind('isOn').to(tokenizrCommand, 'value', value => {
        //   return value && value.id === option.id;
        // });

        def.model.set({
          commandName: 'tokenizr',
          commandValue: option.id,
        });

        itemDefinitions.add(def);

        titles[option.model] = option.title;
        return true;
      });

      const dropdownView = createDropdown(locale);
      addListToDropdown(dropdownView, itemDefinitions);

      dropdownView.buttonView.set({
        isOn: false,
        withText: true,
        tooltip: dropdownTooltip,
      });

      dropdownView.extendTemplate({
        attributes: {
          class: ['ck-tokenizr-dropdown'],
        },
      });

      dropdownView
        .bind('isEnabled')
        .toMany(commands, 'isEnabled', (...areEnabled) =>
          areEnabled.some(isEnabled => isEnabled),
        );

      dropdownView.buttonView
        .bind('label')
        .to(
          tokenizrCommand,
          'value',
          value => (titles[value] ? titles[value] : defaultTitle),
        );

      // Execute command when an item from the dropdown is selected.
      this.listenTo(dropdownView, 'execute', evt => {
        editor.execute(
          evt.source.commandName,
          evt.source.commandValue
            ? options.filter(o => o.id === evt.source.commandValue)[0]
            : undefined,
        );
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }
}
