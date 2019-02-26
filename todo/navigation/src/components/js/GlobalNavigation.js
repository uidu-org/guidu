// @flow
import React, { PureComponent, type Element, type ComponentType } from 'react';
import { WithRootTheme } from '../../theme/util';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import GlobalNavigationInner from '../styled/GlobalNavigationInner';
import GlobalNavigationPrimaryContainer from '../styled/GlobalNavigationPrimaryContainer';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';
import { global } from '../../theme/presets';
import type { IconAppearance } from '../../types';
import type { Provided } from '../../theme/types';

type Props = {
  /** The icon to be used for the create button */
  createIcon?: Element<any>,
  /** A component that will be used to render links. A default link component is
   used if none is provided. */
  linkComponent?: ComponentType<*>,
  /** A list of nodes to be rendered as the global primary actions.  They appear
   directly underneath the global primary icon. This must not exceed three nodes */
  primaryActions?: Array<Element<any>>,
  /** The topmost icon to be placed in the global navigation - usually the product
   logo, or the product home icon */
  primaryIcon?: Element<any>,
  /** The appearance of the primary icon for custom styling purposes */
  primaryIconAppearance: IconAppearance,
  /** A link to place around the primary icon. */
  primaryItemHref?: string,
  /** A list of nodes to be placed in the secondary actions slot at the bottom of
   the global sidebar. This must not exceed five nodes. */
  secondaryActions: Array<Element<any>>,
  /** The icon to use in the global navigation for the global search button */
  searchIcon?: Element<any>,
  /** A handler that is called when the search drawer is requesting to be opened */
  onSearchActivate?: (
    e: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
  ) => void,
  /** A handler that is called when the createIcon is clicked */
  onCreateActivate?: (
    e: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
  ) => void,
  /** The theme of the global navigation. Presets are available via the
  presetThemes named export, or you can generate your own using the the
  createGlobalTheme named export function. */
  theme: Provided,
};

export default class GlobalNavigation extends PureComponent<Props> {
  static defaultProps = {
    primaryIconAppearance: 'round',
    secondaryActions: [],
    theme: global,
  };

  render() {
    const {
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryActions,
      primaryIcon,
      primaryIconAppearance,
      primaryItemHref,
      searchIcon,
      secondaryActions,
      theme,
    } = this.props;

    return (
      <WithRootTheme provided={theme}>
        <GlobalNavigationInner>
          <GlobalNavigationPrimaryContainer>
            <GlobalPrimaryActions
              actions={primaryActions}
              createIcon={createIcon}
              linkComponent={linkComponent}
              onCreateActivate={onCreateActivate}
              onSearchActivate={onSearchActivate}
              primaryIcon={primaryIcon}
              primaryIconAppearance={primaryIconAppearance}
              primaryItemHref={primaryItemHref}
              searchIcon={searchIcon}
            />
          </GlobalNavigationPrimaryContainer>
          <GlobalNavigationSecondaryContainer>
            {secondaryActions.length ? (
              <GlobalSecondaryActions actions={secondaryActions} />
            ) : null}
          </GlobalNavigationSecondaryContainer>
        </GlobalNavigationInner>
      </WithRootTheme>
    );
  }
}
