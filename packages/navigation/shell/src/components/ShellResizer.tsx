import hoverintent from 'hoverintent';
import React, { PureComponent } from 'react';
import { ArrowLeft, Menu } from 'react-feather';
import { Header, Resizer, ResizerButton } from '../styled';

export default class ShellResizer extends PureComponent<any> {
  private wrapper: React.RefObject<any> = React.createRef();

  state = {
    hovered: false,
  };

  componentDidMount() {
    hoverintent(
      this.wrapper.current,
      () => {
        this.setState({ hovered: true });
      },
      () => {
        this.setState({ hovered: false });
      },
    );
  }

  render() {
    const { isCollapsed, onClick, ...rest } = this.props;
    const { hovered } = this.state;
    console.log(hovered);
    return (
      <Resizer
        onClick={onClick}
        ref={this.wrapper}
        hovered={hovered}
        isCollapsed={isCollapsed}
      >
        <Header className="position-relative" style={{ left: -24 }}>
          <ResizerButton
            hovered={hovered}
            isCollapsed={isCollapsed}
            className={`btn align-items-center justify-content-center position-absolute bg-white rounded-circle border`}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onClick();
            }}
            onMouseDown={e => e.stopPropagation()}
            {...rest}
          >
            {isCollapsed ? <Menu size={14} /> : <ArrowLeft size={14} />}
          </ResizerButton>
        </Header>
      </Resizer>
    );
  }
}
