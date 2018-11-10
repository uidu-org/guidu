import React from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from '../components/WrappedLoader';
import * as fs from '../utils/fs';
import Page from '../components/Page';
import Markdown from '../components/Markdown';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';
var docs = [];
export default function Document(_ref) {
  var docId = _ref.match.params.docId;

  if (!docId) {
    var _found = fs.getFiles(docs.children)[0];
    if (!_found) return React.createElement(FourOhFour, null);
    return React.createElement(Redirect, {
      to: "/docs/".concat(fs.normalize(_found.id))
    });
  }

  var filePath = "docs/".concat(docId);
  var found = fs.findNormalized(docs, filePath);
  var Content = Loadable({
    loader: function loader() {
      return found && found.exports();
    },
    loading: Loading,
    render: function render() {
      var md = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var docDetails = md.default || {};
      var content = docDetails.content,
          _docDetails$data = docDetails.data,
          data = _docDetails$data === void 0 ? {} : _docDetails$data;

      if (content) {
        return React.createElement(Markdown, data, content);
      }

      return React.createElement(FourOhFour, null);
    }
  });
  return React.createElement(Page, null, React.createElement(Content, null));
}