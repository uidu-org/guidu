import Button from '@uidu/button';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import { Link } from '../../components/WrappedLink';
import Loadable from '../../components/WrappedLoader';
import * as fs from '../../utils/fs';
import FourOhFour from '../FourOhFour';
import MetaData from './MetaData';
import fetchPackageData from './utils/fsOperations';

export const ButtonGroup = styled.div`
  display: inline-flex;
`;

export const NoDocs = props => {
  return <div>Component "{props.name}" doesn't have any documentation.</div>;
};

export type PackageProps = {
  match: match<Record<string, string>>;
};

export type Props = {
  description?: string;
  urlIsExactMatch: boolean;
  groupId: string;
  pkgId: string;
  pkg: PackageJson;
  doc?: string;
  changelog: Array<Log>;
  examples?: any;
};

type PackageState = {
  changelog: Logs;
  doc: Node | null;
  examples: Array<any> | null;
  missing: boolean | null;
  pkg: Object | null;
};

const initialState = {
  changelog: [],
  doc: null,
  examples: null,
  missing: false,
  pkg: null,
};

function getExamplesPaths(groupId, pkgId, examples) {
  if (!examples || !examples.length) return {};

  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files
  const filtered = examples.map(a => a.id).filter(id => id.match(regex));
  const res = filtered[0];

  if (!res) return {};

  return {
    examplePath: `/examples/${groupId}/${pkgId}/${fs.normalize(res)}`,
    exampleModalPath: `/packages/${groupId}/${pkgId}/example/${fs.normalize(
      res,
    )}`,
  };
}

export default function LoadData({ match }) {
  const { groupId, pkgId } = match.params;

  const Content = Loadable({
    loading: () => (
      <Page>
        <Loading />
      </Page>
    ),
    loader: () =>
      fetchPackageData(groupId, pkgId).catch(
        error => console.log(error) || { error },
      ),
    render: props => {
      const { missing, error } = props;
      if (missing || error) return <FourOhFour />;

      return (
        <Package
          {...props}
          pkgId={pkgId}
          groupId={groupId}
          urlIsExactMatch={match.isExact}
        />
      );
    },
  });

  return <Content />;
}

class Package extends React.Component<Props> {
  render() {
    const {
      urlIsExactMatch,
      groupId,
      pkgId,
      pkg,
      doc,
      changelog,
      examples,
    } = this.props;
    const { examplePath, exampleModalPath } = getExamplesPaths(
      groupId,
      pkgId,
      examples,
    );

    const title = fs.titleize(pkgId);

    return (
      <Page>
        {urlIsExactMatch && (
          <Helmet>
            <title>
              {title} package - {BASE_TITLE}
            </title>
          </Helmet>
        )}
        <div className="d-flex align-items-center justify-content-between">
          <div className="mr-3">
            <h1 className="h4">{title}</h1>
            <p className="mb-0">{pkg.description}</p>
          </div>
          {examplePath && (
            <ButtonGroup>
              {/* <Button
                className="mr-3"
                color="light"
                component={Link}
                to={`/packages/${groupId}/${pkgId}/changelog`}
              >
                <List className="mr-2" size={'1rem'} /> Changelog
              </Button> */}
              <Button component={Link} to={exampleModalPath}>
                Examples
              </Button>
            </ButtonGroup>
          )}
        </div>
        <hr />
        <MetaData
          packageName={pkg.name}
          packageSrc={`https://github.com/uidu-org/guidu/blob/master/packages/${groupId}/${pkgId}`}
          changelog={changelog}
          pkgId={pkgId}
          groupId={groupId}
        />
        <hr />
        {doc || <NoDocs name={pkgId} />}
      </Page>
    );
  }
}
