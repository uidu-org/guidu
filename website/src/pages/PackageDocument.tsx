import { ScrollableContainer, ShellBody, ShellHeader } from '@uidu/shell';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { match } from 'react-router';
import Loading from '../components/Loading';
import Loadable from '../components/WrappedLoader';
import { packages } from '../site';
import * as fs from '../utils/fs';
import FourOhFour from './FourOhFour';

export type PackageDocumentProps = {
  match: match<Record<string, string>>;
};

export type ResolvedJSXElement = {
  default?: JSX.Element;
};

export default function PackageDocument({
  match: {
    params: { groupId, pkgId, docId },
  },
}: PackageDocumentProps) {
  const filePath = `packages/${groupId}/${pkgId}/docs/${docId}`;
  const found = fs.findNormalized(packages, filePath);

  if (!found) {
    return <FourOhFour />;
  }

  const Content = Loadable<{}, ResolvedJSXElement>({
    loading: () => <Loading />,
    loader: async () => (fs.isFile(found) ? await found.exports() : {}),
    render: (doc) => (doc ? doc.default : <FourOhFour />),
  });

  return (
    <>
      <Helmet>
        <title>
          {`${fs.titleize(pkgId)} - ${fs.titleize(docId)} - ${BASE_TITLE}`}
        </title>
      </Helmet>
      <ShellHeader tw="px-3 xl:px-4 border-b">
        {fs.titleize(pkgId)} - {fs.titleize(docId)}
      </ShellHeader>
      <ShellBody>
        <ScrollableContainer>
          <div tw="max-w-7xl mx-auto py-8 px-4">
            <Content />
          </div>
        </ScrollableContainer>
      </ShellBody>
    </>
  );
}
