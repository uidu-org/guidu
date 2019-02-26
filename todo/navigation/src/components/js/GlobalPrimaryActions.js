// @flow
import React, { PureComponent, type ComponentType, type Element } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTrigger from './DrawerTrigger';
import GlobalPrimaryActionsList from './GlobalPrimaryActionsList';
import GlobalPrimaryActionsInner from '../styled/GlobalPrimaryActionsInner';
import GlobalPrimaryActionsPrimaryItem from '../styled/GlobalPrimaryActionsPrimaryItem';
import GlobalPrimaryActionsItemsWrapper from '../styled/GlobalPrimaryActionsItemsWrapper';
import type { IconAppearance } from '../../types';

type Props = {
  actions?: Array<Element<any>>,
  createIcon?: Element<any>,
  linkComponent?: ComponentType<*>,
  onCreateActivate?: (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
  ) => void,
  onSearchActivate?: (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
  ) => void,
  primaryIcon?: Element<any>,
  primaryIconAppearance?: IconAppearance,
  primaryItemHref?: string,
  searchIcon?: Element<any>,
};

export default class GlobalPrimaryActions extends PureComponent<Props> {
  render() {
    const {
      actions,
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryIconAppearance,
      primaryItemHref,
      searchIcon,
    } = this.props;
    return (
      <GlobalPrimaryActionsInner>
        {primaryIcon ? (
          <GlobalPrimaryActionsPrimaryItem>
            <GlobalItem
              id="productLogo"
              href={primaryItemHref}
              linkComponent={linkComponent}
              size="medium"
              appearance={primaryIconAppearance}
            >
              {primaryIcon}
            </GlobalItem>
          </GlobalPrimaryActionsPrimaryItem>
        ) : null}

        <GlobalPrimaryActionsItemsWrapper>
          {actions ? (
            <GlobalPrimaryActionsList actions={actions} />
          ) : (
            <div>
              {searchIcon ? (
                <DrawerTrigger onActivate={onSearchActivate}>
                  {searchIcon}
                </DrawerTrigger>
              ) : null}
              {createIcon ? (
                <DrawerTrigger onActivate={onCreateActivate}>
                  {createIcon}
                </DrawerTrigger>
              ) : null}
            </div>
          )}
        </GlobalPrimaryActionsItemsWrapper>
      </GlobalPrimaryActionsInner>
    );
  }
}
