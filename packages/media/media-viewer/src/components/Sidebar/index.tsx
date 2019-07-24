import Avatar, { AvatarItem } from '@uidu/avatar';
import Button from '@uidu/button';
import { ShellBody, ShellHeader } from '@uidu/shell';
import { colors } from '@uidu/theme';
import React, { Fragment, PureComponent } from 'react';
import { X } from 'react-feather';
import StyledSidebar from './styled';

export default class Sidebar extends PureComponent<any> {
  render() {
    const { currentView, onClose } = this.props;
    const { author, caption, createdAt } = currentView;
    const createdDate = new Date(createdAt).toLocaleDateString();

    return (
      <StyledSidebar>
        <ShellHeader className="px-3 pr-xl-4 border-bottom justify-content-between">
          <div style={{ alignItems: 'center', display: 'flex ', minWidth: 0 }}>
            <AvatarItem
              avatar={<Avatar src={author.avatar} />}
              primaryText={author.name}
              secondaryText={
                <Fragment>
                  <span>{createdDate}</span>
                  {caption ? <span> &mdash; {caption}</span> : null}
                </Fragment>
              }
            />
          </div>
          <div className="d-flex align-items-center">
            {onClose && (
              <Button
                onClick={onClose}
                style={{
                  borderLeft: `1px solid ${colors.N10}`,
                  paddingLeft: 10,
                }}
              >
                <X />
              </Button>
            )}
          </div>
        </ShellHeader>
        <ShellBody>Lista commenti</ShellBody>
      </StyledSidebar>
    );
  }
}
