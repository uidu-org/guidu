// @flow
import React from 'react';
import Loadable from '../components/WrappedLoader';
import * as fs from '../utils/fs';
import type { RouterMatch } from '../types';
import Page from '../components/Page';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';
import { patterns } from '../site';

type Props = {
  match: RouterMatch,
};

export default function Pattern({
  match: {
    params: { patternId },
  },
}: Props) {
  const filePath = `patterns/${patternId}`;
  const found = fs.findNormalized(patterns, filePath);

  if (!found) {
    return <FourOhFour />;
  }

  const Content = Loadable({
    loader: () => found && found.exports(),
    loading: Loading,
    render(mod) {
      if (mod && mod.default) {
        return React.createElement(mod.default);
      }
      return <FourOhFour />;
    },
  });

  return (
    <Page>
      <Content />
    </Page>
  );
}
