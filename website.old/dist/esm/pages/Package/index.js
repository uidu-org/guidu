import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _extends from "@babel/runtime/helpers/extends";
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from '../../components/WrappedLink';
import Loadable from '../../components/WrappedLoader';
import { Helmet } from 'react-helmet';
import { gridSize, colors, math } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import ExamplesIcon from '@atlaskit/icon/glyph/screen';
import { AtlassianIcon } from '@atlaskit/logo';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import FourOhFour from '../FourOhFour';
import MetaData from './MetaData';
import LatestChangelog from './LatestChangelog';
import { isModuleNotFoundError } from '../../utils/errors'; // import * as fs from '../../utils/fs';

import fetchPackageData from './utils/fsOperations';
export var Title = styled.div.withConfig({
  displayName: "Package__Title",
  componentId: "ilzdp2-0"
})(["\n  display: flex;\n\n  h1 {\n    flex-grow: 1;\n  }\n"]);
export var Intro = styled.p.withConfig({
  displayName: "Package__Intro",
  componentId: "ilzdp2-1"
})([""]);
export var ButtonGroup = styled.div.withConfig({
  displayName: "Package__ButtonGroup",
  componentId: "ilzdp2-2"
})(["\n  display: inline-flex;\n  margin: 0 -2px;\n\n  > * {\n    flex: 1 0 auto;\n    margin: 0 2px !important;\n  }\n"]);
export var Sep = styled.hr.withConfig({
  displayName: "Package__Sep",
  componentId: "ilzdp2-3"
})(["\n  border: none;\n  border-top: 2px solid #ebecf0;\n  margin-bottom: ", "px;\n  margin-top: ", "px;\n\n  @media (min-width: 780px) {\n    margin-bottom: ", "px;\n    margin-top: ", "px;\n  }\n"], math.multiply(gridSize, 1.5), math.multiply(gridSize, 1.5), math.multiply(gridSize, 3), math.multiply(gridSize, 3));
export var NoDocs = function NoDocs(props) {
  return React.createElement("div", null, "Component \"", props.name, "\" doesn't have any documentation.");
};
var initialState = {
  changelog: [],
  doc: null,
  examples: null,
  missing: false,
  pkg: null
};

function getExamplesPaths(groupId, pkgId, examples) {
  if (!examples || !examples.length) return {};
  var regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  var filtered = examples.map(function (a) {
    return a.id;
  }).filter(function (id) {
    return id.match(regex);
  });
  var res = filtered[0];
  if (!res) return {};
  return {// examplePath: `/examples/${groupId}/${pkgId}/${fs.normalize(res)}`,
    // exampleModalPath: `/packages/${groupId}/${pkgId}/example/${fs.normalize(
    //   res,
    // )}`,
  };
}

export default function LoadData(_ref) {
  var match = _ref.match;
  var _match$params = match.params,
      groupId = _match$params.groupId,
      pkgId = _match$params.pkgId;
  var Content = Loadable({
    loading: function loading() {
      return React.createElement(Page, null, React.createElement(Loading, null));
    },
    loader: function loader() {
      return fetchPackageData('components', pkgId).catch(function (error) {
        return console.log(error) || {
          error: error
        };
      });
    },
    render: function render(props) {
      console.log(props);
      return props.missing || props.error ? React.createElement(FourOhFour, null) : React.createElement(Package, _extends({}, props, {
        pkgId: pkgId,
        groupId: groupId,
        urlIsExactMatch: match.isExact
      }));
    }
  });
  return React.createElement(Content, null);
}

var Package =
/*#__PURE__*/
function (_Component) {
  _inherits(Package, _Component);

  function Package() {
    _classCallCheck(this, Package);

    return _possibleConstructorReturn(this, _getPrototypeOf(Package).apply(this, arguments));
  }

  _createClass(Package, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          urlIsExactMatch = _this$props.urlIsExactMatch,
          groupId = _this$props.groupId,
          pkgId = _this$props.pkgId,
          pkg = _this$props.pkg,
          pkgInfo = _this$props.pkgInfo,
          doc = _this$props.doc,
          changelog = _this$props.changelog,
          examples = _this$props.examples;

      var _getExamplesPaths = getExamplesPaths(groupId, pkgId, examples),
          examplePath = _getExamplesPaths.examplePath,
          exampleModalPath = _getExamplesPaths.exampleModalPath;

      var title = pkgInfo.title;
      return React.createElement(Page, null, urlIsExactMatch && React.createElement(Helmet, null, React.createElement("title", null, title, " package")), React.createElement(Title, null, React.createElement("h1", null, title), examplePath && React.createElement(ButtonGroup, null, React.createElement(Button, {
        component: Link,
        iconBefore: React.createElement(ExamplesIcon, {
          label: "Examples Icon"
        }),
        to: examplePath
      }), React.createElement(Button, {
        component: Link,
        to: exampleModalPath
      }, "Examples"), pkg['atlaskit:designLink'] && React.createElement(Button, {
        iconBefore: React.createElement(AtlassianIcon, {
          size: "small"
        }),
        href: pkg['atlaskit:designLink']
      }, "Design docs"))), React.createElement(Intro, null, pkg.description), React.createElement(MetaData, {
        packageName: pkg.name,
        packageSrc: "https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/".concat(groupId, "/").concat(pkgId)
      }), React.createElement(LatestChangelog, {
        changelog: changelog,
        pkgId: pkgId,
        groupId: groupId
      }), React.createElement(Sep, null), doc || React.createElement(NoDocs, {
        name: pkgId
      }));
    }
  }]);

  return Package;
}(Component);