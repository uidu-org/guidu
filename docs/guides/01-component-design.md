# Component design

Related reading:

* [Naming props](./naming-props)
* [Higher-order-components vs render props](./hoc-vs-props)
* [`Component` vs `PureComponent`](./component-vs-pure-component)
* [Flow-typing a component](./flow-typing-a-component)
* [Error handling](./error-handling)
* [Testing](./testing)
* [Linting styles](./linting-styles)
* <https://medium.com/flow-type/even-better-support-for-react-in-flow-25b0a3485627>
* <https://flow.org/en/docs/react/types/>

## Problem

You're creating a new Atlaskit Component and need to design its API.

## Solution

The main thing to consider is the public API and there's two parts to this: `props` and `children`. Though, `children` is just a prop, it's special in the way you compose your components together. This means you need to place emphasis on _how_ you want your component to compose and be composed.

### Props

#### Defaults

**Use required props sparingly.** Strive to provide safe defaults for all of your props unless you have good reason not to. For example, instead of requiring a value for `isDisabled`, provide a default of `false`.

```js
type Props = {
  isDisabled?: boolean,
};
class MyComponent extends Component<Props> {
  static defaultProps = {
    isDisabled: false,
  };
}
```

You should also try and make your non-required boolean props default to `false`, as opposed to defaulting to `true` so that one can declaratively opt-in. Generally this is what most tend to do, but it keeps with consistency where you can expect a boolean prop to always be opt-in.

To opt-in you just add the prop: `<MyComponent isDisabled />`. To opt-out, you don't provide it at all: `<MyComponent />`. If it defaulted to true, you don't have to do anything to opt-in, but to opt-out you then have to do: `<MyComponent isDisabled={false} />`.

To do the inverse (not disabled) you could create an `isEnabled` prop and default it to `false`.

### Composition

Favour composition by default. This means a consumer should be able to compose in whatever they want as `{children}`:

```js
<MyComponent>
  <Whatever />
</MyComponent>
```

Essentially this is the same thing as doing:

```js
type Props = {
  children: React.Node,
};
class MyComponent extends Component<Props> {}
```

This may not be ideal in some scenarios and in those cases where we want to guide them in the right direction we can type the `children`:

```js
type Props = {
  children: React.Element<typeof Whatever>,
};
class MyComponent extends Component<Props> {}
```

#### Data props and render functions

Another pattern is passing data as a prop and rendering a component using the supplied data. In this example, we use the `items` prop and map over it to render our component:

```js
type Props = {
  items: Array<Object>,
};
class MyComponent extends Component<Props> {
  static defaultProps = {
    items: [],
  };
  render() {
    return this.prop.items.map(item => <Whatever {...item} />);
  }
}
```

However, in this scenario, `<Whatever />` is hard-coded. To make this so the user can supply their own component we can provide a render prop:

```js
type Props = {
  items: Array<Object>
  renderItem: Object => React.Node
};
class MyComponent extends Component<Props> {
  static defaultProps = {
    items: [],
    renderItem: (item: Object) => <Whatever {...item} />
  }
  render() {
    return this.props.items.map(this.props.renderItem);
  }
}
```

#### Deciding between children or data props

This is longer winded than simply typing `children`, but it means that for dynamic data sets - possibly returned from a `fetch()` request - that we can filter / map / reduce and we have control over exactly how many items rendered, and in what order.

A good rule of thumb here is if you find yourself needing to traverse children, you should probably be using a data prop.
