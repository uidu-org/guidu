import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import styled from 'styled-components';
import { Link } from '../../components/WrappedLink';
import Btn from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import Icon from '@atlaskit/icon/glyph/bullet-list';
import { colors, gridSize, math, themed } from '@atlaskit/theme';
import Changelog from '../../components/ChangeLog';

var LatestChange = function LatestChange(_ref) {
  var changelog = _ref.changelog,
      pkgId = _ref.pkgId,
      groupId = _ref.groupId;
  if (!changelog || !changelog[0] || !changelog[0].version) return null;
  return React.createElement(LogWrapper, null, React.createElement(Latest, null), React.createElement(Changelog, {
    changelog: changelog,
    range: changelog[0].version,
    packageName: pkgId
  }), React.createElement(Button, {
    component: Link,
    iconBefore: React.createElement(Icon, {
      label: "List icon"
    }),
    to: "/packages/".concat(groupId, "/").concat(pkgId, "/changelog")
  }, "Changelog"));
};

var LogWrapper = styled.div.withConfig({
  displayName: "LatestChangelog__LogWrapper",
  componentId: "ouayyp-0"
})(["\n  border-top: 2px solid ", ";\n  margin-bottom: 2em;\n  padding-top: ", "px;\n  position: relative;\n\n  h2 {\n    font-size: 18px;\n    font-weight: 500;\n  }\n  ul {\n    padding-left: ", "px;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n"], themed({
  light: colors.N30,
  dark: colors.DN60
}), math.multiply(gridSize, 3), math.multiply(gridSize, 4));
var Button = styled(Btn).withConfig({
  displayName: "LatestChangelog__Button",
  componentId: "ouayyp-1"
})(["\n  position: absolute;\n  right: 0;\n  top: ", "px;\n"], math.multiply(gridSize, 3));

var Latest = function Latest(_ref2) {
  var children = _ref2.children,
      rest = _objectWithoutProperties(_ref2, ["children"]);

  return React.createElement("span", {
    style: {
      position: 'relative',
      top: -3
    }
  }, React.createElement(Lozenge, _extends({
    appearance: "new"
  }, rest), children || 'Latest'));
};

export default LatestChange;