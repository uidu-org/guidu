import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import TokenizrEditing from './tokenizrediting';
import TokenizrUI from './tokenizrui';

export default class Tokenizr extends Plugin {
  static get requires() {
    return [TokenizrEditing, TokenizrUI];
  }

  static get pluginName() {
    return 'Tokenizr';
  }
}
