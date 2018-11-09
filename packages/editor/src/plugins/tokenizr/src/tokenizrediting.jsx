import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import TokenizrCommand from './tokenizrcommand';

const tokenizrAttributes = element => ({
  class: element.getAttribute('class'),
  'data-id': element.getAttribute('data-id'),
  'data-name': element.getAttribute('data-name'),
  'data-widget': 'tokenizr',
});

const createTokenizrElement = (modelElement, viewWriter) =>
  viewWriter &&
  viewWriter.createContainerElement('span', tokenizrAttributes(modelElement));

export default class TokenizrEditing extends Plugin {
  constructor(editor) {
    super(editor);
    editor.config.define('tokenizr', {
      options: [
        {
          'data-widget': 'tokenizr',
          id: 'h2',
          name: 'Heading 1',
          class: 'ck-tokenizr badge badge-primary badge-pill',
        },
        {
          'data-widget': 'tokenizr',
          id: 'h3',
          name: 'Heading 2',
          class: 'ck-tokenizr badge badge-primary badge-pill',
        },
        {
          'data-widget': 'tokenizr',
          id: 'h4',
          name: 'Heading 3',
          class: 'ck-tokenizr badge badge-primary badge-pill',
        },
      ],
    });
  }

  static get requires() {
    return [];
  }

  init() {
    const { editor } = this;
    const { model, conversion, commands } = editor;
    const { schema } = model;

    schema.register('tokenizr', {
      isObject: true,
      isBlock: true,
      allowWhere: '$block',
      allowIn: '$block',
      inheritAllFrom: '$block',
    });

    conversion.elementToElement({
      model: 'tokenizr',
      view: createTokenizrElement,
    });

    conversion.for('upcast').add(
      upcastElementToElement({
        view: {
          name: 'span',
          attributes: {
            'data-widget': 'tokenizr',
          },
        },
        model: (viewElement, modelWriter) =>
          modelWriter.createElement(
            'tokenizr',
            tokenizrAttributes(viewElement),
          ),
      }),
    );

    // Register the tokenizr command for this option.
    commands.add('tokenizr', new TokenizrCommand(editor));
  }
}
