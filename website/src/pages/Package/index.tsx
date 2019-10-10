import Button, { ButtonGroup } from '@uidu/button';
import Drawer from '@uidu/drawer';
import { ShellBody, ShellHeader } from '@uidu/shell';
import React, { Fragment } from 'react';
import {
  GitHub,
  List,
  Menu,
  MoreVertical,
  Package as PackageIcon,
} from 'react-feather';
import { Helmet } from 'react-helmet';
import Media from 'react-media';
import { RouteComponentProps } from 'react-router';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import { Link } from '../../components/WrappedLink';
import Loadable from '../../components/WrappedLoader';
import Navigation from '../../containers/Nav';
import * as fs from '../../utils/fs';
import FourOhFour from '../FourOhFour';
import fetchPackageData from './utils/fsOperations';

export const NoDocs = props => {
  return <div>Component "{props.name}" doesn't have any documentation.</div>;
};

export type PackageProps = {} & RouteComponentProps;

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
  state = {
    isDrawerOpen: false,
    isDrawerOptionsOpen: false,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  openOptionsDrawer = () =>
    this.setState({
      isDrawerOptionsOpen: true,
    });

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  onCloseOptions = () => {
    this.setState({
      isDrawerOptionsOpen: false,
    });
  };

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
      <Fragment>
        <Drawer
          onClose={this.onClose}
          isOpen={this.state.isDrawerOpen}
          size="narrow"
        >
          <Navigation {...this.props} />
        </Drawer>

        <Drawer
          onClose={this.onCloseOptions}
          isOpen={this.state.isDrawerOptionsOpen}
          size="narrow"
          origin="bottom"
        >
          <p>Foo</p>
        </Drawer>
        {urlIsExactMatch && (
          <Helmet>
            <title>
              {title} package - {BASE_TITLE}
            </title>
          </Helmet>
        )}
        <ShellHeader className="">
          <div className="container my-3 my-sm-5">
            <div className="row justify-content-center">
              <div className="col-lg-10 d-flex justify-content-between align-content-center">
                <h1 className="h5 m-0 d-flex align-items-center">
                  <Button
                    type="button"
                    onClick={this.openDrawer}
                    appearance="subtle"
                    iconBefore={<Menu size={18} />}
                    className="mr-3 d-lg-none"
                  ></Button>
                  <small>
                    <code>{pkg.name}</code>
                  </small>
                </h1>
                {examplePath && (
                  <Media query={{ maxWidth: 768 }}>
                    {matches => {
                      if (matches) {
                        return (
                          <ButtonGroup>
                            <Button
                              type="button"
                              onClick={this.openOptionsDrawer}
                              appearance="subtle"
                              iconBefore={<MoreVertical size={18} />}
                            ></Button>
                            <Button
                              component={React.forwardRef(
                                ({ children, ...rest }, ref: any) => (
                                  <Link
                                    {...rest}
                                    to={exampleModalPath}
                                    ref={ref}
                                  >
                                    {children}
                                  </Link>
                                ),
                              )}
                            >
                              Examples
                            </Button>
                          </ButtonGroup>
                        );
                      }
                      return (
                        <ButtonGroup>
                          <Button
                            href={`https://www.npmjs.com/package/${pkg.name}`}
                            label="npm"
                            summary={pkg.name}
                            iconBefore={<PackageIcon size={16} />}
                            target="_blank"
                          />
                          <Button
                            href={`https://github.com/uidu-org/guidu/blob/master/packages/${groupId}/${pkgId}`}
                            label="Source"
                            summary="Github"
                            iconBefore={<GitHub size={16} />}
                            target="_blank"
                          />
                          <Button
                            component={Link as any}
                            to={`/packages/${groupId}/${pkgId}/changelog`}
                            iconBefore={<List size={16} />}
                          >
                            Changelog
                          </Button>
                          <Button
                            component={React.forwardRef(
                              ({ children, ...rest }, ref: any) => (
                                <Link {...rest} to={exampleModalPath} ref={ref}>
                                  {children}
                                </Link>
                              ),
                            )}
                          >
                            Examples
                          </Button>
                        </ButtonGroup>
                      );
                    }}
                  </Media>
                )}
              </div>
            </div>
          </div>
        </ShellHeader>
        <ShellBody scrollable>
          <div className="container my-3 my-sm-5">
            <div className="row justify-content-center">
              <div className="col-lg-10">{doc || <NoDocs name={pkgId} />}</div>
            </div>
          </div>
        </ShellBody>
      </Fragment>
    );
  }
}
