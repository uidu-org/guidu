import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import { Slide } from '@uidu/slider';
import React, { useRef } from 'react';
import { Circle } from 'react-feather';
import {
  NavLink as Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { ShellProps } from '../types';
import ShellHeaderCloseAndNavigate from './ShellHeaderCloseAndNavigate';
import ShellHeaderSlideBack from './ShellHeaderSlideBack';
import ShellSlideWrapper from './ShellSlideWrapper';

export default function Shell({ baseUrl, slides, embedded }: ShellProps) {
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

  return (
    <>
      <ShellHeader className="border-bottom px-3 px-xl-4 justify-content-between">
        <Switch>
          {slides.map((slide) => {
            return (
              <Route path={`${match.path}${slide['data-history']}`} exact>
                {renderSlideHeader(slide)}
              </Route>
            );
          })}
        </Switch>

        <div className="navbar-actions" id="navbar-actions">
          <ul className="list-inline d-flex align-items-center justify-content-end mb-0 flex-nowrap">
            {slides.map((slide, index) => (
              <li className="nav-item" key={slide.key}>
                <Link
                  to={`${slide['data-history']}`}
                  className="nav-link px-1 text-muted"
                >
                  <Circle size={10} fill="currentColor" stroke="currentColor" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ShellHeader>
      <ShellBody>
        <ShellMain>
          <ScrollableContainer ref={container}>
            <Switch>
              {slides.map((slide) => {
                console.log(slide);
                return (
                  <Route path={`${match.path}${slide['data-history']}`} exact>
                    <Slide key={slide.key} data-history={slide['data-history']}>
                      {slide.unwrapped ? (
                        slide.component
                      ) : (
                        <ShellSlideWrapper embedded={embedded}>
                          {slide.component}
                        </ShellSlideWrapper>
                      )}
                    </Slide>
                  </Route>
                );
              })}
            </Switch>
          </ScrollableContainer>
        </ShellMain>
      </ShellBody>
    </>
  );
}
