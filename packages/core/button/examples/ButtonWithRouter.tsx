import * as React from 'react';
// @ts-ignore
import { Link, MemoryRouter } from 'react-router-dom';
import Button from '../src';

type Props = {
  children: React.ReactChild;
  className: string;
  href: Link;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
};

class RouterLink extends React.PureComponent<Props, {}> {
  render() {
    const {
      children,
      className,
      href,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

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
      <Button appearance="subtle-link" href="/" component={RouterLink}>
        Button Using Routing
      </Button>
    </MemoryRouter>
  </div>
);

export default ButtonWithRouter;
