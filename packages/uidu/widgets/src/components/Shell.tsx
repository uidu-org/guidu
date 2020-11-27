import { ShellBody, ShellHeader, ShellMain, ShellSidebar } from '@uidu/shell';
import SideNavigation, { GlobalNavigation } from '@uidu/side-navigation';
import { colors } from '@uidu/theme';
import React from 'react';
import { ArrowLeft, Check, Circle } from 'react-feather';
import {
  NavLink as Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import styled from 'styled-components';
import { ShellProps } from '../types';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    // transform: `translateY(${styles.offset}%)`,
  };
}

function slide(val) {
  return spring(val, {
    stiffness: 125,
    damping: 16,
  });
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    offset: 100,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    offset: -100,
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    offset: slide(0),
  },
};

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

export default function Shell({
  name,
  baseUrl,
  steps,
  embedded,
  sidebarFooterAdditionalItems = [],
}: ShellProps) {
  const match = useRouteMatch();
  const history = useHistory();

  const schema = [
    {
      type: 'NavigationHeaderMultiline',
      children: (
        <>
          <h5 className="m-0 font-weight-bold">{name}</h5>
        </>
      ),
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
        ...sidebarFooterAdditionalItems,
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
      <style>{`.route-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.route-wrapper > div {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}`}</style>
      {!embedded && (
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
              to: baseUrl,
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
              zIndex: 3,
              backgroundColor: 'var(--body-bg)',
            }}
          >
            <SideNavigation schema={schema} />
          </ShellSidebar>
        </>
      )}
      <ShellMain>
        {embedded && (
          <ShellHeader className="border-bottom px-3 px-xl-4 justify-content-between">
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
          </ShellHeader>
        )}
        <ShellBody>
          <AnimatedSwitch
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(embedded
              ? {}
              : {
                  atEnter: bounceTransition.atEnter,
                  atLeave: bounceTransition.atLeave,
                  atActive: bounceTransition.atActive,
                  mapStyles: mapStyles,
                  className: 'route-wrapper',
                })}
          >
            {steps.map(({ isDisabled, relativePath, component: Component }) => {
              return (
                <Route
                  path={`${match.path}/${relativePath}`}
                  key={relativePath}
                  exact
                >
                  {isDisabled ? (
                    <Redirect to={`${match.url}/${steps[0].relativePath}`} />
                  ) : (
                    <Component />
                  )}
                </Route>
              );
            })}
            <Redirect to={`${match.url}/${steps[0].relativePath}`} />
          </AnimatedSwitch>
        </ShellBody>
      </ShellMain>
    </>
  );
}
