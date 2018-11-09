"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.divvyChangelog = void 0;

var divvyChangelog = function divvyChangelog(changelog) {
  var splitToken = "__CHANGELOG_SPLIT_".concat(Date.now(), "__");
  return changelog.default.replace(/[\n\r\s]## /g, "".concat(splitToken, "## ")).split(splitToken).reduce(function (all, md) {
    // This should only allow us to skip the first chunk which is the name, as
    // well as the unreleased section.
    var match = md.match(/\d+\.\d+\.\d+/); // Getting the repository url

    var repository = md.match('https://bitbucket.org/atlassian/atlaskit/commits/') ? 'atlaskit' : 'atlaskit-mk-2';
    var version = match ? match[0] : null;
    if (!version) return all;
    return all.concat({
      version: version,
      md: md,
      repository: repository
    });
  }, []);
};

exports.divvyChangelog = divvyChangelog;