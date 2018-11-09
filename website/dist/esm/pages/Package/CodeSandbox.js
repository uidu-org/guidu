import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import CodeSandboxer from 'react-codesandboxer';
import { replaceImports } from 'codesandboxer';
import { replaceSrc } from '@atlaskit/docs';

var getExampleUrl = function getExampleUrl(groupId, packageId, exampleId) {
  return "https://bitbucket.org/atlassian/atlaskit-mk-2/raw/HEAD/packages/".concat(groupId, "/").concat(packageId, "/examples/").concat(exampleId);
};

var getExamplePath = function getExamplePath(groupId, packageId, exampleId) {
  return "packages/".concat(groupId, "/").concat(packageId, "/examples/").concat(exampleId);
};

var repoUrl = 'https://bitbucket.org/atlassian/atlaskit-mk-2';

var baseFiles = function baseFiles(groupId, packageId, exampleId) {
  return {
    'index.js': {
      content: "/**\n  This CodeSandbox has been automatically generated from the contents of ".concat(getExampleUrl(groupId, packageId, exampleId), ".\n\n  This generator does not follow relative imports beyond those that reference the\n  module root, and as such, other relative imports may fail to load.\n\n  You can look up the relative imports from ").concat(repoUrl, "\n\n  If this fails in any other way, contact Ben Conolly (https://bitbucket.org/bconolly)\n*/\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport '@atlaskit/css-reset';\nimport Example from './example';\n\nReactDOM.render(\n<Example />,\ndocument.getElementById('root')\n);")
    }
  };
};
/*
  The css packs use loaders, which are not needed in prod. This is incredibly not
  ideal. This handles these to create valid sandboxes.

  We only apply this creative solution because these examples are not recommended
  usages in any case.
*/


var cssLoaderExceptions = function cssLoaderExceptions(pkgJSONName, groupId, packageId) {
  return [['!!style-loader!css-loader!../src/bundle.css', pkgJSONName], ["packages/".concat(groupId, "/").concat(packageId, "/src/index.less"), pkgJSONName], ['!!raw-loader!../src/icons-sprite.svg', "".concat(pkgJSONName, "/dist/icons-sprite.svg")]];
};

var tsMatch = /.+(\.ts|\.tsx)/;

var CodeSandbox =
/*#__PURE__*/
function (_Component) {
  _inherits(CodeSandbox, _Component);

  function CodeSandbox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CodeSandbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CodeSandbox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      parameters: ''
    };
    return _this;
  }

  _createClass(CodeSandbox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          deployButton = _this$props.deployButton,
          example = _this$props.example,
          examples = _this$props.examples,
          groupId = _this$props.groupId,
          loadingButton = _this$props.loadingButton,
          packageId = _this$props.packageId,
          pkgJSON = _this$props.pkgJSON,
          afterDeployError = _this$props.afterDeployError;
      var name = example.id.split('.').slice(0, -1).join('-');
      if (tsMatch.test(example.id)) return null;
      return React.createElement(CodeSandboxer, {
        examplePath: getExamplePath(groupId, packageId, example.id),
        example: example.contents().then(function (content) {
          return replaceSrc(content.default, pkgJSON.name);
        }),
        pkgJSON: pkgJSON,
        name: "".concat(pkgJSON.name, "-").concat(name),
        afterDeployError: afterDeployError,
        gitInfo: {
          account: 'atlassian',
          repository: 'atlaskit-mk-2',
          branch: 'master',
          host: 'bitbucket'
        },
        importReplacements: [["packages/".concat(groupId, "/").concat(packageId, "/src"), pkgJSON.name], ['packages/core/icon/glyph/*', "".concat(pkgJSON.name, "/glyph/")], ['packages/core/icon-file-type/glyph/*', "".concat(pkgJSON.name, "/glyph/")], ['packages/core/icon-object/glyph/*', "".concat(pkgJSON.name, "/glyph/")]].concat(_toConsumableArray(cssLoaderExceptions(pkgJSON.name, groupId, packageId))),
        dependencies: _defineProperty({
          '@atlaskit/css-reset': 'latest',
          'styled-components': pkgJSON.peerDependencies && pkgJSON.peerDependencies['styled-components'] ? pkgJSON.peerDependencies['styled-components'] : 'latest'
        }, pkgJSON.name, pkgJSON.version),
        providedFiles: baseFiles(groupId, packageId, example.id)
      }, function (_ref2) {
        var isLoading = _ref2.isLoading,
            error = _ref2.error;
        return isLoading ? loadingButton() : deployButton({
          error: error
        });
      });
    }
  }]);

  return CodeSandbox;
}(Component);

export { CodeSandbox as default };