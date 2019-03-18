import * as React from 'react';
import Loadable from '../components/WrappedLoader';
import * as fs from '../utils/fs';
import { match } from 'react-router';
import Page from '../components/Page';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';
import { patterns } from '../site';

export type Props = {
  match: match<Record<string, string>>;
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

  const Content = Loadable<{}, { default?: string }>({
    loader: async () =>
      found && fs.isFile(found) ? await found.exports() : {},
    loading: () => <Loading />,
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
