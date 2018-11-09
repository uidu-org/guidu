// @flow

import { Container } from 'unstated';

import type {
  InitialUIControllerShape,
  UIControllerCache,
  UIControllerCacheGetter,
  UIControllerCacheSetter,
  UIControllerInterface,
  UIControllerShape,
} from './types';

import { CONTENT_NAV_WIDTH } from '../common/constants';

const defaultState = {
  isPeekHinting: false,
  isPeeking: false,
  isResizing: false,
  isResizeDisabled: false,
  isCollapsed: false,
  productNavWidth: CONTENT_NAV_WIDTH,
};

type Resize = {
  productNavWidth: number,
  isCollapsed: boolean,
};

export default class UIController extends Container<UIControllerShape>
  implements UIControllerInterface {
  getCache: ?UIControllerCacheGetter;
  setCache: ?UIControllerCacheSetter;
  isCollapsedStore: boolean | void;

  constructor(
    initialState?: InitialUIControllerShape,
    cache: UIControllerCache | false,
  ) {
    super();

    let cachedState = {};
    if (cache) {
      const { get, set } = cache;
      const retrievedCache = get();

      if (retrievedCache) {
        const { isCollapsed, productNavWidth } = retrievedCache;
        cachedState = { isCollapsed, productNavWidth };
      }

      this.getCache = get;
      this.setCache = set;
    }

    const state = {
      ...defaultState,
      ...cachedState,
      ...initialState,
    };

    let isCollapsed = state.isCollapsed;

    // isResizeDisabled takes precedence over isCollapsed
    if (initialState && initialState.isResizeDisabled) {
      // Remember this so that we can reset it if resizing is enabled again.
      this.isCollapsedStore = isCollapsed;
      isCollapsed = false;
    }

    this.state = { ...state, isCollapsed };
  }

  storeState = (state: Object) => {
    this.setState(state);
    const { isCollapsed, productNavWidth } = this.state;
    if (this.setCache) {
      this.setCache({ isCollapsed, productNavWidth });
    }
  };

  // ==============================
  // UI
  // ==============================

  collapse = () => {
    if (this.state.isResizeDisabled) {
      return;
    }
    this.storeState({ isCollapsed: true });
  };
  expand = () => {
    if (this.state.isResizeDisabled) {
      return;
    }
    this.storeState({ isCollapsed: false });
  };
  toggleCollapse = () => {
    const toggle = this.state.isCollapsed ? this.expand : this.collapse;
    toggle();
  };

  manualResizeStart = ({ productNavWidth, isCollapsed }: Resize) => {
    if (this.state.isResizeDisabled) {
      return;
    }
    this.storeState({
      isResizing: true,
      productNavWidth,
      isCollapsed,
    });
  };
  manualResizeEnd = ({ productNavWidth, isCollapsed }: Resize) => {
    if (this.state.isResizeDisabled) {
      return;
    }
    this.storeState({
      isResizing: false,
      productNavWidth,
      isCollapsed,
    });
  };

  enableResize = () => {
    const isCollapsed =
      typeof this.isCollapsedStore === 'boolean'
        ? this.isCollapsedStore
        : this.state.isCollapsed;

    // This is a page-level setting not a user preference so we don't cache
    // this.
    this.setState({ isCollapsed, isResizeDisabled: false });
  };
  disableResize = () => {
    // Remember this so that we can reset it if resizing is enabled again.
    this.isCollapsedStore = this.state.isCollapsed;

    // This is a page-level setting not a user preference so we don't cache
    // this.
    this.setState({ isCollapsed: false, isResizeDisabled: true });
  };

  peekHint = () => {
    this.storeState({ isPeekHinting: true });
  };
  unPeekHint = () => {
    this.storeState({ isPeekHinting: false });
  };
  togglePeekHint = () => {
    const toggle = this.state.isPeekHinting ? this.unPeekHint : this.peekHint;
    toggle();
  };

  peek = () => {
    this.storeState({ isPeeking: true });
  };
  unPeek = () => {
    this.storeState({ isPeeking: false });
  };
  togglePeek = () => {
    const toggle = this.state.isPeeking ? this.unPeek : this.peek;
    toggle();
  };
}
