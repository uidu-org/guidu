// @flow

import { Container } from 'unstated';

import type {
  Reducer,
  View,
  ViewData,
  ViewID,
  ViewControllerInterface,
  ViewControllerProps,
  ViewControllerState,
} from './types';

const defaultProps: ViewControllerProps = {
  initialPeekViewId: null,
  isDebugEnabled: false,
};

type StateKeys =
  | { active: 'activeView', incoming: 'incomingView' }
  | { active: 'activePeekView', incoming: 'incomingPeekView' };

export default class ViewController extends Container<ViewControllerState>
  implements ViewControllerInterface {
  state = {
    activeView: null,
    incomingView: null,
    activePeekView: null,
    incomingPeekView: null,
  };

  reducers: { [ViewID]: Reducer[] } = {};
  views: { [ViewID]: View } = {};
  isDebugEnabled: boolean = false;
  initialPeekViewId: ?ViewID = null;

  constructor({
    initialPeekViewId,
    isDebugEnabled,
  }: ViewControllerProps = defaultProps) {
    super();
    if (typeof isDebugEnabled !== 'undefined') {
      this.isDebugEnabled = isDebugEnabled;
    }
    if (initialPeekViewId) {
      this.setInitialPeekViewId(initialPeekViewId);
    }
  }

  /**
   * DRY function for setting a view. Can be configured to set either the active
   * view, or the active peek view.
   */
  _setViewInternals = (stateKeys: StateKeys) => (viewId: ViewID) => {
    const updateViewController = this._updateViewController(stateKeys);
    const { incoming } = stateKeys;
    const view = this.views[viewId];

    // The view has been added
    if (view) {
      const { id, type, getItems } = view;
      const returnedItems = getItems();

      // This view returned a Promise
      if (returnedItems instanceof Promise) {
        // Enter a temporary loading state
        this.setState({ [incoming]: { id, type } });

        // Wait for the Promise to resolve
        returnedItems.then(data => {
          updateViewController(view, data);
        });
        return;
      }

      // The view returned data
      updateViewController(view, returnedItems);
      return;
    }

    // The view has not been added yet. We enter an indefinite loading state
    // until the view is added or another view is set.
    this.setState({ [incoming]: { id: viewId, type: null } });
  };

  /**
   * Helper function for reducing a view's data and updating the state.
   */
  _updateViewController = (stateKeys: StateKeys) => (
    view: View,
    initialData: ViewData,
  ) => {
    const { active, incoming } = stateKeys;
    const { id, type, getAnalyticsAttributes } = view;
    const reducers = this.reducers[id] || [];
    const data = reducers.reduce((d, reducer) => reducer(d), initialData);
    const analyticsAttributes = getAnalyticsAttributes
      ? getAnalyticsAttributes(data)
      : undefined;

    this.setState({
      [active]: { id, type, data, analyticsAttributes },
      [incoming]: null,
    });
  };

  /**
   * Add a reducer to the view with the given ID.
   */
  addReducer = (viewId: ViewID, reducer: Reducer) => {
    const reducersForView = [...(this.reducers[viewId] || []), reducer];
    this.reducers = { ...this.reducers, [viewId]: reducersForView };

    // If we're adding a reducer to the active view we'll want to force an
    // update so that the reducer gets applied.
    this.updateActiveView(viewId);
  };

  /**
   * Remove a reducer from the view with the given ID.
   */
  removeReducer = (viewId: ViewID, reducer: Reducer) => {
    const reducersForView = this.reducers[viewId];
    if (!reducersForView) {
      return;
    }

    const newReducers = reducersForView.filter(r => r !== reducer);
    this.reducers = { ...this.reducers, [viewId]: newReducers };

    // If we're removing a reducer from the active view we'll want to force an
    // update so that the data gets re-evaluated.
    this.updateActiveView(viewId);
  };

  /**
   * Register a view. You must provide an `id`, the `type` of view ('product' or
   * 'container'), and a `getItems` function which should return either an array
   * of data, or a Promise which will resolve to an array of data.
   */
  addView = (view: View) => {
    const { id } = view;
    this.views = { ...this.views, [id]: view };

    // We need to call setView or setPeekView again for the following cases:
    // 1. The added view matches the active view (if it returns a Promise we
    //    want to temporarily enter a loading state while it resolves).
    // 2. The added view matches the expected incoming view and we want to
    //    resolve it.
    const {
      activeView,
      incomingView,
      activePeekView,
      incomingPeekView,
    } = this.state;
    if (
      (activeView && id === activeView.id) ||
      (incomingView && id === incomingView.id)
    ) {
      this.setView(id);
    }
    if (
      (activePeekView && id === activePeekView.id) ||
      (incomingPeekView && id === incomingPeekView.id)
    ) {
      this.setPeekView(id);
    }
  };

  /**
   * Un-register a view. If the view being removed is active it will remain so
   * until a different view is set.
   */
  removeView = (viewId: ViewID) => {
    delete this.views[viewId];
  };

  /**
   * Set the registered view with the given ID as the active view.
   */
  setView = this._setViewInternals({
    active: 'activeView',
    incoming: 'incomingView',
  });

  /**
   * Set the registered view with the given ID as the active peek view.
   */
  setPeekView = this._setViewInternals({
    active: 'activePeekView',
    incoming: 'incomingPeekView',
  });

  /**
   * Specify which view should be treated as the initial peek view.
   */
  setInitialPeekViewId = (viewId: ViewID) => {
    this.initialPeekViewId = viewId;
    this.setPeekView(viewId);
  };

  /**
   * Will re-resolve the active view and re-reduce its data. Accepts an optional
   * view ID to only re-resolve if the given ID matches the active view.
   */
  updateActiveView = (maybeViewId?: ViewID) => {
    const { activeView } = this.state;

    if (!activeView) {
      return;
    }

    if (maybeViewId && maybeViewId === activeView.id) {
      this.setView(maybeViewId);
      return;
    }

    if (!maybeViewId) {
      this.setView(activeView.id);
    }
  };

  /**
   * Set whether the view controller is in debug mode.
   */
  setIsDebugEnabled = (isDebugEnabled: boolean) => {
    this.isDebugEnabled = isDebugEnabled;
  };
}
