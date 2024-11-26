import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import EditorActions from '../../actions';
import { EventDispatcher } from '../../event-dispatcher';
import { EditorContext } from '../EditorContext';

export interface State {
  [name: string]: any;
}

export type PluginsConfig = { [name: string]: PluginKey };
export type Context = {
  editorActions?: EditorActions;
};

export interface Props {
  eventDispatcher?: EventDispatcher;
  editorView?: EditorView;
  plugins: PluginsConfig;
  render: (pluginsState: any) => React.ReactElement<any> | null;
}

/**
 * Wraps component in a high order component that watches state changes of given plugins
 * and passes those states to the wrapped component.
 *
 * Example:
 * <WithPluginState
 *   eventDispatcher={eventDispatcher}
 *   editorView={editorView}
 *   plugins={{
 *     hyperlink: hyperlinkPluginKey
 *   }}
 *   render={renderComponent}
 * />
 *
 * renderComponent: ({ hyperlink }) => React.Component;
 */
export default function WithPluginState(props: Props) {
  const { plugins } = props;

  const context = useContext(EditorContext);

  const debounce = useRef<number | null>(null);

  const listeners = useRef({});
  const notAppliedState = useRef({});

  const [isSubscribed, setIsSubscribed] = useState(false);

  const getEditorView = useCallback(
    (maybeProps?: Props, maybeContext?: Context) => {
      const { editorView } = maybeProps || props;
      const { editorActions } = maybeContext || context;
      return (
        editorView || (editorActions && editorActions._privateGetEditorView())
      );
    },
    [context, props],
  );

  const getPluginsStates = (
    plugins: { [name: string]: PluginKey },
    editorView?: EditorView,
  ) => {
    if (!editorView || !plugins) {
      return {};
    }

    return Object.keys(plugins).reduce<Record<string, any>>((acc, propName) => {
      const pluginKey = plugins[propName];
      if (!pluginKey) {
        return acc;
      }
      acc[propName] = pluginKey.getState(editorView.state);
      return acc;
    }, {});
  };

  const [state, setState] = useState(
    getPluginsStates(props.plugins, getEditorView(props, context)),
  );

  // static contextTypes = {
  //   editorActions: PropTypes.object,
  //   editorSharedConfig: PropTypes.object,
  // };

  // state = {};

  // context!: Context;

  // constructor(props: Props, context: Context) {
  //   super(props);
  //   state = getPluginsStates(
  //     props.plugins,
  //     getEditorView(props, context),
  //   );
  // }

  // private getEditorView(
  //   maybeProps?: Props,
  //   maybeContext?: Context,
  // ): EditorView | undefined {
  //   const props = maybeProps || props;
  //   const context = maybeContext || context;
  //   return (
  //     props.editorView ||
  //     (context &&
  //       context.editorActions &&
  //       context.editorActions._privateGetEditorView())
  //   );
  // }

  const getEventDispatcher = useCallback(
    (maybeProps?: Props): EventDispatcher | undefined => {
      const { eventDispatcher } = maybeProps || props;
      return (
        eventDispatcher ||
        (context &&
          context.editorActions &&
          context.editorActions._privateGetEventDispatcher())
      );
    },
    [context, props],
  );

  const handlePluginStateChange = useCallback(
    (propName: string, skipEqualityCheck?: boolean) => (pluginState: any) => {
      // skipEqualityCheck is being used for old plugins since they are mutating plugin state instead of creating a new one
      if (state[propName] !== pluginState || skipEqualityCheck) {
        setState((prevState) => {
          return {
            ...prevState,
            [propName]: pluginState,
          };
        });
      }
    },
    [state],
  );

  /**
   * Debounces setState calls in order to reduce number of re-renders caused by several plugin state changes.
   */
  const updateState = (stateSubset: State) => {
    const toBeApplied = { ...notAppliedState.current, ...stateSubset };
    console.log('notAppliedState', notAppliedState);
    console.log('toBeApplied', toBeApplied);

    if (debounce.current) {
      window.clearTimeout(debounce.current);
    }

    debounce.current = window.setTimeout(() => {
      setState(toBeApplied);
      debounce.current = null;
      notAppliedState.current = {};
    }, 0);
  };

  const subscribe = useCallback((): void => {
    const eventDispatcher = getEventDispatcher(props);
    const editorView = getEditorView(props, context);

    if (!eventDispatcher || !editorView || isSubscribed) {
      return;
    }

    setIsSubscribed(true);

    const newState = getPluginsStates(plugins, editorView);
    setState(newState);

    Object.keys(plugins).forEach((propName) => {
      const pluginKey = plugins[propName];
      if (!pluginKey) {
        return;
      }

      const pluginState = state[propName];
      const isPluginWithSubscribe = pluginState && pluginState.subscribe;
      const handler = handlePluginStateChange(propName, isPluginWithSubscribe);

      if (isPluginWithSubscribe) {
        pluginState.subscribe(handler);
      } else {
        eventDispatcher.on(pluginKey.key, handler);
      }

      listeners.current[pluginKey.key] = { handler, pluginKey };
    });
  }, [
    isSubscribed,
    context,
    getEditorView,
    getEventDispatcher,
    plugins,
    props,
    state,
    handlePluginStateChange,
  ]);

  const unsubscribe = useCallback(() => {
    const eventDispatcher = getEventDispatcher();
    const editorView = getEditorView(props, context);

    if (!eventDispatcher || !editorView || !isSubscribed) {
      return;
    }

    Object.keys(listeners.current).forEach((key) => {
      const pluginState = listeners.current[key].pluginKey.getState(
        editorView.state,
      );

      if (pluginState && pluginState.unsubscribe) {
        pluginState.unsubscribe(listeners.current[key].handler);
      } else {
        eventDispatcher.off(key, listeners.current[key].handler);
      }
    });

    listeners.current = {};
  }, [isSubscribed, context, getEditorView, getEventDispatcher, props]);

  const onContextUpdate = useCallback(() => {
    subscribe();
  }, [subscribe]);

  const subscribeToContextUpdates = useCallback(() => {
    if (context && context.editorActions) {
      context.editorActions._privateSubscribe(onContextUpdate);
    }
  }, [onContextUpdate, context]);

  const unsubscribeFromContextUpdates = useCallback(() => {
    if (context && context.editorActions) {
      context.editorActions._privateUnsubscribe(onContextUpdate);
    }
  }, [onContextUpdate, context]);

  // componentDidMount() {
  //   subscribe(props);
  //   subscribeToContextUpdates(context);
  // }
  useEffect(() => {
    subscribe();
    subscribeToContextUpdates();

    return () => {
      if (debounce.current) window.clearTimeout(debounce.current);
      unsubscribeFromContextUpdates();
      unsubscribe();
    };
  }, [
    subscribe,
    unsubscribe,
    subscribeToContextUpdates,
    unsubscribeFromContextUpdates,
  ]);

  // UNSAFE_componentWillReceiveProps(nextProps: Props) {
  //   if (!isSubscribed) {
  //     subscribe(nextProps);
  //   }
  // }

  // componentWillUnmount() {
  //   if (debounce) window.clearTimeout(debounce);
  //   unsubscribeFromContextUpdates(context);
  //   unsubscribe();
  // }

  // render() {
  const { render } = props;
  return render(state);
  // }
}
