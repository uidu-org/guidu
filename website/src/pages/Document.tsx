import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Fragment } from 'react';
import { match } from 'react-router';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Markdown from '../components/Markdown';
import Loadable from '../components/WrappedLoader';
import { docs } from '../site';
import * as fs from '../utils/fs';
import FourOhFour from './FourOhFour';

export type DocProps = {
  match: match<Record<string, string>>; // TODO: replace with react router
};

export type ResolvedMD = {
  default?: {
    content?: string;
    data?: Object;
  };
};

export default function Document({
  match: {
    params: { docId },
  },
}: DocProps) {
  if (!docId) {
    const found = fs.getFiles(docs.children)[0];
    if (!found) return <FourOhFour />;
    return <Redirect to={`/docs/${fs.normalize(found.id)}`} />;
  }

  const filePath = `docs/${docId}`;
  const found = fs.findNormalized(docs, filePath);

  const Content = Loadable<{}, ResolvedMD>({
    loader: async () => (fs.isFile(found) ? await found.exports() : {}),
    loading: () => <Loading />,
    render(md) {
      const docDetails = md.default || {};
      const { content, data = {} } = docDetails;
      if (content) {
        return <Markdown {...data}>{content}</Markdown>;
      }
      return <FourOhFour />;
    },
  });

  return (
    <Fragment>
      <ShellHeader className="px-3 px-xl-4 border-bottom">
        Documentation
      </ShellHeader>
      <ShellBody scrollable>
        <div className="container my-3 my-sm-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <Content />
            </div>
          </div>
        </div>
      </ShellBody>
    </Fragment>
  );
}
