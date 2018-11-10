import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import React, { PureComponent } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
import ImageCaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import EmbedPlugin from 'ckeditor5-embed/src/embed'; // custom plugins

import Tokenizr from './plugins/tokenizr/src/tokenizr';

var UploadAdapter =
/*#__PURE__*/
function () {
  function UploadAdapter(loader) {
    _classCallCheck(this, UploadAdapter);

    // Save Loader instance to update upload progress.
    this.loader = loader;
  }

  _createClass(UploadAdapter, [{
    key: "upload",
    value: function upload() {
      console.log(this.loader); // Update loader's progress.
      // server.onUploadProgress(data => {
      //   loader.uploadTotal = data.total;
      //   loader.uploaded = data.uploaded;
      // });
      // Return promise that will be resolved when file is uploaded.
      // return server.upload(loader.file);
    }
  }, {
    key: "abort",
    value: function abort() {
      // Reject promise returned from upload() method.
      server.abortUpload();
    }
  }]);

  return UploadAdapter;
}();

var Editor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Editor, _PureComponent);

  function Editor() {
    _classCallCheck(this, Editor);

    return _possibleConstructorReturn(this, _getPrototypeOf(Editor).apply(this, arguments));
  }

  _createClass(Editor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          config = _this$props.config;
      return React.createElement(CKEditor, {
        onInit: function onInit(_ref) {
          var plugins = _ref.plugins;

          plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new UploadAdapter(loader);
          };
        },
        onChange: function onChange(event, editor) {
          console.log(editor.getData());
        },
        config: _objectSpread({
          plugins: [EssentialsPlugin, FileRepository, HeadingPlugin, AutoformatPlugin, BoldPlugin, ItalicPlugin, UnderlinePlugin, BlockQuotePlugin, EasyImagePlugin, ImagePlugin, ImageCaptionPlugin, ImageStylePlugin, ImageToolbarPlugin, ImageUploadPlugin, LinkPlugin, ListPlugin, ParagraphPlugin, EmbedPlugin, // custom
          Tokenizr],
          toolbar: {
            items: ['heading', '|', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', 'link', 'imageUpload', 'embed', 'blockQuote', 'tokenizr', '|', 'undo', 'redo']
          },
          image: {
            toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
          }
        }, config),
        editor: ClassicEditor,
        data: value
      });
    }
  }]);

  return Editor;
}(PureComponent);

export { Editor as default };