import Command from '@ckeditor/ckeditor5-core/src/command';

export default class HeadingCommand extends Command {
  constructor(editor, modelElements) {
    super(editor);
    this.modelElements = modelElements;
  }

  refresh() {
    this.isEnabled = true;
  }

  execute(option) {
    const { model } = this.editor;
    const { document } = model;

    const { selection } = document;

    model.change(writer => {
      const position = selection.getLastPosition();

      if (option) {
        const tokenizr = writer.createElement('tokenizr', {
          class: option.class,
          'data-id': option.id,
          'data-name': option.name,
          'data-widget': 'tokenizr',
        });
        writer.insert(tokenizr, position);
        writer.insertText(' ', tokenizr, 'after');
      }
    });
  }
}
