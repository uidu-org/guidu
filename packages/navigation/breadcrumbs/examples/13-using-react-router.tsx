import { FaceSmileIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { Link, MemoryRouter } from 'react-router-dom';

import { BreadcrumbsItem, BreadcrumbsStateless } from '../src';

interface Props {
  children: Node;
  className: string;
  href: Link;
  onMouseEnter: (e: React.MouseEvent) => any;
  onMouseLeave: (e: React.MouseEvent) => any;
}
class RouterLink extends React.PureComponent<Props, {}> {
  render() {
    const { children, className, href, onMouseEnter, onMouseLeave } =
      this.props;

    return (
      <Link
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        to={href}
      >
        {children}
      </Link>
    );
  }
}

const ButtonWithRouter = () => (
  <div>
    <MemoryRouter>
      <BreadcrumbsStateless onExpand={(...args) => console.log(args)}>
        <BreadcrumbsItem href="/pages" text="Pages" component={RouterLink} />
        <BreadcrumbsItem
          href="/pages/home"
          text="Home"
          component={RouterLink}
        />
        <BreadcrumbsItem
          href="/item"
          iconBefore={<FaceSmileIcon label="Test icon" size="small" />}
          text="Icon Before"
          component={RouterLink}
        />
        <BreadcrumbsItem
          href="/item"
          iconAfter={<FaceSmileIcon label="Test icon" size="small" />}
          text="Icon After"
          component={RouterLink}
        />
      </BreadcrumbsStateless>
    </MemoryRouter>
  </div>
);

export default ButtonWithRouter;
