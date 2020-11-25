import { ShellBody, ShellMain, ShellSidebar } from '@uidu/shell';
import SideNavigation, { GlobalNavigation } from '@uidu/side-navigation';
import { colors } from '@uidu/theme';
import React, { useRef } from 'react';
import { ArrowLeft, Check } from 'react-feather';
import {
  NavLink as Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { ShellProps } from '../types';
import ShellHeaderCloseAndNavigate from './ShellHeaderCloseAndNavigate';
import ShellHeaderSlideBack from './ShellHeaderSlideBack';

const StyledStepNumber = styled.div<{
  size: string;
  isCompleted: boolean;
  isDisabled: boolean;
}>`
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 4rem;
  color: ${colors.N0};
  background: ${({ isCompleted }) =>
    isCompleted ? 'var(--primary)' : 'var(--light)'};
  font-weight: bold;
  height: ${({ size }) => (size === 'small' ? '1.25rem' : '1.5rem')};
  width: ${({ size }) => (size === 'small' ? '1.25rem' : '1.5rem')};
  text-align: center;
  transition: background-color 300ms linear;
  font-size: 0.8rem;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

export default function Shell({ name, baseUrl, steps, embedded }: ShellProps) {
  const match = useRouteMatch();
  const history = useHistory();
  const container: React.RefObject<HTMLDivElement> = useRef(null);

  const onSlideBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const renderSlideHeader = ({ header: { to, name } }) => {
    return (
      <>
        {to === 'back' ? (
          <ShellHeaderSlideBack onSlideBack={onSlideBack} />
        ) : (
          <ShellHeaderCloseAndNavigate to={baseUrl} />
        )}
        <div className="navbar-title">
          <span className="navbar-brand m-0">{name}</span>
        </div>
      </>
    );
  };

  const schema = [
    {
      type: 'NavigationHeader',
      text: name,
    },
    {
      type: 'NavigationSection',
      items: [
        {
          type: 'NavigationGroup',
          items: steps.map(
            ({
              name,
              relativePath,
              isCompleted = false,
              isDisabled = false,
            }) => ({
              exact: true,
              to: `${match.url}/${relativePath}`,
              text: name,
              as: Link,
              replace: true,
              type: 'NavigationItem',
              isDisabled,
              after: (
                <StyledStepNumber
                  size="small"
                  isCompleted={isCompleted}
                  isDisabled={isDisabled}
                >
                  <Check size={12} strokeWidth={3} />
                </StyledStepNumber>
              ),
            }),
          ),
        },
      ],
    },
    {
      type: 'NavigationFooter',
      items: [
        {
          type: 'InlineComponent',
          component: () => (
            <>
              <div className="mt-3 py-3 border-top">
                <div className="px-4 small text-center">
                  Powered by <b>uidu</b>
                  <br />
                  Terms Privacy
                </div>
              </div>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <GlobalNavigation
        className="d-none d-lg-flex border-right"
        width="4rem"
        navigationWidth={17}
        navigationMinWidth="17rem"
        style={{
          backgroundColor: 'var(--body-bg)',
          color: 'var(--primary)',
        }}
        header={{
          as: Link,
          to: '',
          exact: true,
          children: <ArrowLeft size={18} color="currentColor" />,
        }}
        body={[]}
        footer={[]}
      />
      <ShellSidebar
        className="d-none d-lg-flex border-right"
        style={{
          width: '17rem',
        }}
      >
        <SideNavigation schema={schema} />
      </ShellSidebar>
      <ShellMain>
        {/* <ShellHeader className="border-bottom px-3 px-xl-4 justify-content-between">
          <Switch>
            {steps.map((step) => {
              return (
                <Route path={`${match.path}/${step.relativePath}`} exact>
                  {step.name}
                </Route>
              );
            })}
          </Switch>

          <div className="navbar-actions" id="navbar-actions">
            <ul className="list-inline d-flex align-items-center justify-content-end mb-0 flex-nowrap">
              {steps.map((step, index) => (
                <li className="nav-item" key={step.relativePath}>
                  <Link
                    to={`${match.url}/${step.relativePath}`}
                    className="nav-link px-1 text-muted"
                  >
                    <Circle
                      size={10}
                      fill="currentColor"
                      stroke="currentColor"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ShellHeader> */}
        <ShellBody>
          <Switch>
            {steps.map(({ relativePath, component: Component }) => {
              return (
                <Route
                  path={`${match.path}/${relativePath}`}
                  key={relativePath}
                  exact
                >
                  <Component />
                </Route>
              );
            })}
            <Redirect to={`${match.url}/${steps[0].relativePath}`} />
          </Switch>
        </ShellBody>
      </ShellMain>
    </>
  );
}
