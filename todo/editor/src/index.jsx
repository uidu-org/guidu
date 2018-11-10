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
import EmbedPlugin from 'ckeditor5-embed/src/embed';

// custom plugins
import Tokenizr from './plugins/tokenizr/src/tokenizr';

class UploadAdapter {
  constructor(loader) {
    // Save Loader instance to update upload progress.
    this.loader = loader;
  }

  upload() {
    console.log(this.loader);
    // Update loader's progress.
    // server.onUploadProgress(data => {
    //   loader.uploadTotal = data.total;
    //   loader.uploaded = data.uploaded;
    // });

    // Return promise that will be resolved when file is uploaded.
    // return server.upload(loader.file);
  }

  abort() {
    // Reject promise returned from upload() method.
    server.abortUpload();
  }
}

export default class Editor extends PureComponent {
  render() {
    const { value, config } = this.props;
    return (
      <CKEditor
        onInit={({ plugins }) => {
          plugins.get('FileRepository').createUploadAdapter = loader =>
            new UploadAdapter(loader);
        }}
        onChange={(event, editor) => {
          console.log(editor.getData());
        }}
        config={{
          plugins: [
            EssentialsPlugin,
            FileRepository,
            HeadingPlugin,
            AutoformatPlugin,
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            BlockQuotePlugin,
            EasyImagePlugin,
            ImagePlugin,
            ImageCaptionPlugin,
            ImageStylePlugin,
            ImageToolbarPlugin,
            ImageUploadPlugin,
            LinkPlugin,
            ListPlugin,
            ParagraphPlugin,
            EmbedPlugin,
            // custom
            Tokenizr,
          ],
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              '|',
              'bulletedList',
              'numberedList',
              'link',
              'imageUpload',
              'embed',
              'blockQuote',
              'tokenizr',
              '|',
              'undo',
              'redo',
            ],
          },
          image: {
            toolbar: [
              'imageStyle:full',
              'imageStyle:side',
              '|',
              'imageTextAlternative',
            ],
          },
          ...config,
        }}
        editor={ClassicEditor}
        data={value}
      />
    );
  }
}
