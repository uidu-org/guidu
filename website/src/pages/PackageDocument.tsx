import * as React from 'react';
import { match } from 'react-router';
import Loadable from '../components/WrappedLoader';
import { Helmet } from 'react-helmet';
import { packages } from '../site';
import * as fs from '../utils/fs';
import Page, { Title } from '../components/Page';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';

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
    render: doc => (doc ? doc.default : <FourOhFour />),
  });

  return (
    <Page>
      <Helmet>
        <title>
          {`${fs.titleize(pkgId)} - ${fs.titleize(docId)} - ${BASE_TITLE}`}
        </title>
      </Helmet>
      <Title>
        {fs.titleize(pkgId)} - {fs.titleize(docId)}
      </Title>
      <Content />
    </Page>
  );
}
