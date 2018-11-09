import React from 'react';
import Loadable from '../components/WrappedLoader';
import * as fs from '../utils/fs';
import Page from '../components/Page';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';
var patterns = [];
export default function Pattern(_ref) {
  var patternId = _ref.match.params.patternId;
  var filePath = "patterns/".concat(patternId);
  var found = fs.findNormalized(patterns, filePath);

  if (!found) {
    return React.createElement(FourOhFour, null);
  }

  var Content = Loadable({
    loader: function loader() {
      return found && found.exports();
    },
    loading: Loading,
    render: function render(mod) {
      if (mod && mod.default) {
        return React.createElement(mod.default);
      }

      return React.createElement(FourOhFour, null);
    }
  });
  return React.createElement(Page, null, React.createElement(Content, null));
}