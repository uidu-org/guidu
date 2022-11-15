import { BreadcrumbsItem, BreadcrumbsStateless } from '@uidu/breadcrumbs';
import Button, { ButtonGroup } from '@uidu/button';
import Drawer from '@uidu/drawer';
import PageHeader from '@uidu/page-header';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import 'overlayscrollbars/overlayscrollbars.css';
import React, { Fragment } from 'react';
import {
  GitHub,
  List,
  MoreVertical,
  Package as PackageIcon,
} from 'react-feather';
import { Helmet } from 'react-helmet';
import Media from 'react-media';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import { Link } from '../../components/WrappedLink';
import Loadable from '../../components/WrappedLoader';
import Navigation from '../../containers/Nav';
import * as fs from '../../utils/fs';
import FourOhFour from '../FourOhFour';
import fetchPackageData from './utils/fsOperations';

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
  const filtered = examples.map((a) => a.id).filter((id) => id.match(regex));
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
        (error) => console.log(error) || { error },
      ),
    render: (props) => {
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
    const { urlIsExactMatch, groupId, pkgId, pkg, doc, changelog, examples } =
      this.props;
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

        <ShellBody>
          <ShellMain>
            <ScrollableContainer>
              <PageHeader
                tw="px-4 pt-8 max-w-6xl mx-auto"
                actions={
                  examplePath && (
                    <Media query={{ maxWidth: 768 }}>
                      {(matches) => {
                        if (matches) {
                          return (
                            <ButtonGroup>
                              <Button
                                onClick={this.openOptionsDrawer}
                                appearance="subtle"
                                iconBefore={<MoreVertical size={18} />}
                              ></Button>
                              <Button
                                as={Link}
                                to={exampleModalPath}
                                appearance="primary"
                              >
                                Examples
                              </Button>
                            </ButtonGroup>
                          );
                        }
                        return (
                          <ButtonGroup>
                            <Button
                              as="a"
                              href={`https://www.npmjs.com/package/${pkg.name}`}
                              label="npm"
                              summary={pkg.name}
                              iconBefore={<PackageIcon size={16} />}
                              target="_blank"
                            />
                            <Button
                              as="a"
                              href={`https://github.com/uidu-org/guidu/blob/main/packages/${groupId}/${pkgId}`}
                              label="Source"
                              summary="Github"
                              iconBefore={<GitHub size={16} />}
                              target="_blank"
                            />
                            <Button
                              as={Link as any}
                              to={`/packages/${groupId}/${pkgId}/changelog`}
                              iconBefore={<List size={16} />}
                            >
                              Changelog
                            </Button>
                            <Button
                              as={Link as any}
                              to={exampleModalPath}
                              appearance="primary"
                            >
                              Examples
                            </Button>
                          </ButtonGroup>
                        );
                      }}
                    </Media>
                  )
                }
                breadcrumbs={
                  <BreadcrumbsStateless onExpand={() => {}}>
                    <BreadcrumbsItem text="Packages" key="Some project" />
                    <BreadcrumbsItem text="Core" key="Parent page" />
                  </BreadcrumbsStateless>
                }
                // disableTitleStyles
              >
                {/* <Button
              type="button"
              onClick={this.openDrawer}
              appearance="subtle"
              iconBefore={<Menu size={18} />}
              tw="mr-3 md:hidden"
            ></Button> */}
                {title}
              </PageHeader>
              <div tw="max-w-6xl mx-auto px-4 pb-8">
                {doc || <NoDocs name={pkgId} />}
              </div>
            </ScrollableContainer>
          </ShellMain>
        </ShellBody>
      </Fragment>
    );
  }
}
