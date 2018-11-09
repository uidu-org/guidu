// @flow

import { UIController, ViewController } from '../../../';
import type { ConnectedItemProps } from '../ConnectedItem/types';

type InjectedProps = {
  /** Internal prop injected by withNavigationUI HOC */
  navigationUIController: UIController,
  /** Internal prop injected by withNavigationViewController HOC */
  navigationViewController: ViewController,
};

export type ExternalGoToItemProps = {
  ...ConnectedItemProps,
  /** The view ID that should be transitioned to onClick. */
  goTo: string,
  /** The time in milliseconds to delay the spinner that appears when transitioning to a view that is still being loaded. */
  spinnerDelay: number,
};

export type GoToItemProps = InjectedProps & ExternalGoToItemProps;
