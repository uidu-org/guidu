"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildNavGroups;

var fs = _interopRequireWildcard(require("../../../utils/fs"));

function buildNavGroups(prefix, Icon, pathname, dir) {
  return dir.children.map(function (group) {
    if (group.type === 'file') {
      return {
        items: [{
          to: "/".concat(prefix, "/").concat(fs.normalize(group.id)),
          isSelected: function isSelected(pathname, to) {
            return pathname.startsWith(to);
          },
          title: fs.titleize(group.id) // icon: <Icon label={`${fs.titleize(group.id)} icon`} />,

        }]
      };
    }

    var children = fs.getFiles(group.children);
    return {
      title: group.id,
      items: children.map(function (doc) {
        return {
          to: "/".concat(prefix, "/").concat(group.id, "/").concat(fs.normalize(doc.id)),
          isSelected: function isSelected(pathname, to) {
            return pathname.startsWith(to);
          },
          title: fs.titleize(doc.id) // icon: <Icon label={`${fs.titleize(doc.id)} icon`} />,

        };
      })
    };
  });
}

module.exports = exports.default;