// @flow

/* eslint-disable react/no-multi-comp */

import React, { Component, createContext, Fragment, type Node } from 'react';
import { Example } from '@atlaskit/docs';
import { colors } from '@atlaskit/theme';

/**
 * Load an example in an iframe
 */
export const IframeExample = ({ source, title, url }: *) => (
  <Example
    packageName="@atlaskit/navigation-next"
    Component={() => (
      <iframe
        src={url}
        style={{
          border: 0,
          height: '500px',
          overflow: 'hidden',
          width: '100%',
        }}
        title={title}
      />
    )}
    source={source}
    title={title}
  />
);

/**
 * Contents
 */
const slugify = (s: string) =>
  s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const {
  Consumer: ContentsContextConsumer,
  Provider: ContentsContextProvider,
} = createContext();

type ContentsProviderProps = { children: Node };
type ContentsProviderState = { items: string[] };
type ContentsProviderActions = {
  registerItem: string => void,
  unregisterItem: string => void,
};
type ContentsContext = {
  state: ContentsProviderState,
  actions: ContentsProviderActions,
};

export class ContentsProvider extends Component<
  ContentsProviderProps,
  ContentsProviderState,
> {
  state = {
    items: [],
  };
  registerItem = (item: string) => {
    this.setState(
      state =>
        !state.items.includes(item) ? { items: [...state.items, item] } : null,
    );
  };
  unregisterItem = (item: string) => {
    const newItems = this.state.items.filter(i => i !== item);
    this.setState({ items: newItems });
  };
  actions: ContentsProviderActions = {
    registerItem: this.registerItem,
    unregisterItem: this.unregisterItem,
  };
  render() {
    const { state, actions } = this;
    return (
      <ContentsContextProvider value={{ state, actions }}>
        {this.props.children}
      </ContentsContextProvider>
    );
  }
}

type ContentsProps = {
  listType?: 'ol' | 'ul',
};
export const Contents = ({ listType: List = 'ul' }: ContentsProps) => {
  return (
    <ContentsContextConsumer>
      {context =>
        context && context.state.items.length ? (
          <Fragment>
            <h3>Contents</h3>
            <List>
              {context.state.items.map(item => (
                <li key={item}>
                  <a href={`#${slugify(item)}`}>{item}</a>
                </li>
              ))}
            </List>
          </Fragment>
        ) : null
      }
    </ContentsContextConsumer>
  );
};

type HProps = {
  children: string,
};
type HWithContextProps = HProps & {
  __context: ContentsContext | void,
};
class HWithContext extends Component<HWithContextProps> {
  componentDidMount() {
    const { __context, children } = this.props;
    if (__context) {
      __context.actions.registerItem(children);
    }
  }
  componentWillUnmount() {
    const { __context, children } = this.props;
    if (__context) {
      __context.actions.unregisterItem(children);
    }
  }
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        {/* eslint-disable jsx-a11y/anchor-has-content */}
        <a name={slugify(children)} />
        <h2>{children}</h2>
      </Fragment>
    );
  }
}

export const H = (props: HProps) => (
  <ContentsContextConsumer>
    {context => <HWithContext {...props} __context={context} />}
  </ContentsContextConsumer>
);

/**
 * Horizontal rule
 */
export const Hr = () => (
  <hr
    css={{
      backgroundColor: colors.N40,
      border: 0,
      height: 2,
      marginBottom: '3em',
      marginTop: '3em',
    }}
  />
);
