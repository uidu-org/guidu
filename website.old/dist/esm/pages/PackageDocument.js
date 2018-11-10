import React from 'react';
import Loadable from '../components/WrappedLoader';
import { Helmet } from 'react-helmet';
import * as fs from '../utils/fs';
import Page, { Title } from '../components/Page';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';
var packages = [];
export default function PackageDocument(_ref) {
  var _ref$match$params = _ref.match.params,
      groupId = _ref$match$params.groupId,
      pkgId = _ref$match$params.pkgId,
      docId = _ref$match$params.docId;
  var filePath = "packages/".concat(groupId, "/").concat(pkgId, "/docs/").concat(docId);
  var found = fs.findNormalized(packages, filePath);

  if (!found) {
    return React.createElement(FourOhFour, null);
  }

  var Content = Loadable({
    loading: Loading,
    loader: function loader() {
      return found && found.exports();
    },
    render: function render(doc) {
      return doc ? doc.default : React.createElement(FourOhFour, null);
    }
  });
  return React.createElement(Page, null, React.createElement(Helmet, null, React.createElement("title", null, fs.titleize(pkgId), " - ", fs.titleize(docId))), React.createElement(Title, null, fs.titleize(pkgId), " - ", fs.titleize(docId)), React.createElement(Content, null));
}