"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = _interopRequireWildcard(require("react"));

var _ckeditor5React = _interopRequireDefault(require("@ckeditor/ckeditor5-react"));

var _classiceditor = _interopRequireDefault(require("@ckeditor/ckeditor5-editor-classic/src/classiceditor"));

var _essentials = _interopRequireDefault(require("@ckeditor/ckeditor5-essentials/src/essentials"));

var _filerepository = _interopRequireDefault(require("@ckeditor/ckeditor5-upload/src/filerepository"));

var _autoformat = _interopRequireDefault(require("@ckeditor/ckeditor5-autoformat/src/autoformat"));

var _bold = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/bold"));

var _italic = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/italic"));

var _underline = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/underline"));

var _blockquote = _interopRequireDefault(require("@ckeditor/ckeditor5-block-quote/src/blockquote"));

var _easyimage = _interopRequireDefault(require("@ckeditor/ckeditor5-easy-image/src/easyimage"));

var _heading = _interopRequireDefault(require("@ckeditor/ckeditor5-heading/src/heading"));

var _image = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/image"));

var _imagecaption = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imagecaption"));

var _imagestyle = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imagestyle"));

var _imagetoolbar = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imagetoolbar"));

var _imageupload = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imageupload"));

var _link = _interopRequireDefault(require("@ckeditor/ckeditor5-link/src/link"));

var _list = _interopRequireDefault(require("@ckeditor/ckeditor5-list/src/list"));

var _paragraph = _interopRequireDefault(require("@ckeditor/ckeditor5-paragraph/src/paragraph"));

var _embed = _interopRequireDefault(require("ckeditor5-embed/src/embed"));

var _tokenizr = _interopRequireDefault(require("./plugins/tokenizr/src/tokenizr"));

// custom plugins
var UploadAdapter =
/*#__PURE__*/
function () {
  function UploadAdapter(loader) {
    (0, _classCallCheck2.default)(this, UploadAdapter);
    // Save Loader instance to update upload progress.
    this.loader = loader;
  }

  (0, _createClass2.default)(UploadAdapter, [{
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
  (0, _inherits2.default)(Editor, _PureComponent);

  function Editor() {
    (0, _classCallCheck2.default)(this, Editor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Editor).apply(this, arguments));
  }

  (0, _createClass2.default)(Editor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          config = _this$props.config;
      return _react.default.createElement(_ckeditor5React.default, {
        onInit: function onInit(_ref) {
          var plugins = _ref.plugins;

          plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new UploadAdapter(loader);
          };
        },
        onChange: function onChange(event, editor) {
          console.log(editor.getData());
        },
        config: (0, _objectSpread2.default)({
          plugins: [_essentials.default, _filerepository.default, _heading.default, _autoformat.default, _bold.default, _italic.default, _underline.default, _blockquote.default, _easyimage.default, _image.default, _imagecaption.default, _imagestyle.default, _imagetoolbar.default, _imageupload.default, _link.default, _list.default, _paragraph.default, _embed.default, // custom
          _tokenizr.default],
          toolbar: {
            items: ['heading', '|', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', 'link', 'imageUpload', 'embed', 'blockQuote', 'tokenizr', '|', 'undo', 'redo']
          },
          image: {
            toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
          }
        }, config),
        editor: _classiceditor.default,
        data: value
      });
    }
  }]);
  return Editor;
}(_react.PureComponent);

exports.default = Editor;
module.exports = exports.default;