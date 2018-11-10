// @flow

/**
 * @deprecated This module is deprecated in favour of the 'view-state' module.
 */

import { Container } from 'unstated';
import { diff } from 'deep-object-diff';

import Logger from '../services/logger';
import type {
  ViewStateOptions,
  ViewStateState,
  Reducer,
  View,
  ViewKey,
  ViewResolver,
} from './types';

const defaultOptions: ViewStateOptions = {
  activeView: null,
  reducers: {},
  views: {},
  debug: false,
};

export default class ViewState extends Container<ViewStateState> {
  reducers: { [ViewKey]: Reducer[] } = {};
  views: { [ViewKey]: ViewResolver } = {};
  debug: boolean;
  logger: Logger;

  constructor(options: ViewStateOptions | void) {
    super();
    const { activeView, reducers, views, debug } = {
      ...defaultOptions,
      ...options,
    };

    // Initialise state
    this.state = {
      activeView,
      data: null,
      isLoading: !activeView,
      nextView: null,
    };

    this.reducers = reducers;
    this.views = views;

    this.logger = new Logger({ debug, prefix: 'Nav API' });

    // Resolve the active view data if we have an activeView.
    if (activeView) {
      this.setView(activeView);
    }
  }

  /**
   * Setters
   */

  setDebug = (enabled: boolean) => {
    this.logger.setDebug(enabled);
  };

  /**
   * Adds reducer from source to the view with viewKey
   */
  addReducer = (
    viewKey: ViewKey,
    reducer: Reducer,
    source?: string = 'unknown',
  ) => {
    const reducerList = [
      ...(this.reducers[viewKey] || []),
      { source, fn: reducer },
    ];
    this.reducers = { ...this.reducers, [viewKey]: reducerList };

    this.logger.debug(
      `Adding reducer from '${source} to '${viewKey}' view - %O`,
      reducer,
    );
    // If we're adding a reducer to the active view we'll want to re-set it so
    // that the reducer gets applied.
    const { activeView } = this.state;
    if (activeView && viewKey === activeView) {
      this.setView(activeView);
    }
  };

  removeReducer = (viewKey: ViewKey, reducer: Reducer) => {
    const viewReducerList = this.reducers[viewKey];
    if (!viewReducerList) {
      return;
    }

    const reducerList = viewReducerList.filter(({ fn }) => fn !== reducer);
    this.reducers = { ...this.reducers, [viewKey]: reducerList };

    // If we're removing a reducer from the active view we'll want to re-set it
    // so that the data gets re-evaluated.
    const { activeView } = this.state;
    if (activeView && viewKey === activeView) {
      this.setView(activeView);
    }
  };

  addView = (viewKey: ViewKey, viewGetter: ViewResolver) => {
    const { activeView, nextView } = this.state;

    // Add the new view to the views map.
    const newViews = { ...this.views, [viewKey]: viewGetter };

    this.views = newViews;

    // We need to call setView again for the following cases:
    // 1. The added view matches the activeView (if it returns a Promise we
    //    want to temporarily enter a loading state while it resolves).
    // 2. The added view matches the expected nextView and we want to
    //    resolve it.
    if (viewKey === activeView || viewKey === nextView) {
      this.setView(viewKey);
    }
  };

  setView = (maybeViewKey: ViewKey | null) => {
    if (maybeViewKey === null) {
      this.setState({ activeView: null, data: null });
      return;
    }

    const viewKey: ViewKey = maybeViewKey;
    const viewGetter = this.views[viewKey];

    // This view has already been added.
    if (viewGetter) {
      const view = viewGetter();

      // This view returned a Promise.
      if (view instanceof Promise) {
        // Enter a temporary loading state.
        this.setState({ isLoading: true, nextView: viewKey });

        // Wait for the promise to resolve.
        view.then(viewData => {
          this.setViewData(viewKey, viewData);
        });
        return;
      }

      // This view returned an Object.
      this.setViewData(viewKey, view);
      return;
    }

    // This view has not been added yet. We enter an indefinite loading
    // state until the view is added or another view is set.
    this.setState({ isLoading: true, nextView: viewKey });
  };

  setViewData = (viewKey: ViewKey, viewData: View) => {
    this.logger.debugGroup(`Setting active view`);
    this.logger.debug(`Active view: '${viewKey}'`);

    // Pass the data through any reducers.
    const reducers = this.reducers[viewKey] || [];

    const data = reducers.reduce((currentView, reducer) => {
      this.logger.debugGroupCollapsed(`Applying '${reducer.source}' reducer`);

      const reducedData = reducer.fn(currentView, viewKey);

      this.logger.debug(`Data diff: %O`, diff(currentView, reducedData));
      this.logger.debug(`Function: %O`, reducer.fn);
      this.logger.debugGroupEnd();

      return reducedData;
    }, viewData);

    this.logger.debug(`View data: %O`, data);
    this.logger.debugConditional(
      reducers.length > 0,
      `Diff after reducers: %O`,
      diff(viewData, data),
    );
    this.logger.debugGroupEnd(`Setting active view`);

    this.setState({
      activeView: viewKey,
      data,
      isLoading: false,
      nextView: null,
    });
  };

  /**
   * Will re-resolve the active view and re-reduce its data. Accepts an optional
   * viewKey to only re-resolve if the given key matches the active view.
   */
  updateActiveView = (maybeViewKey?: string) => {
    const { activeView, data } = this.state;
    const viewKey = maybeViewKey || activeView;

    if (!viewKey || !data || viewKey !== activeView) {
      return;
    }

    this.setView(viewKey);
  };
}
