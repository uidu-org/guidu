# Flow typing a component

Related reading:

* [Using Flow with React](https://flow.org/en/docs/react/)

The documentation linked above is an awesome resource. Really, it is worth a read.
The sections below will highlight a few of the things we feel are important.

## Optional props

Optional props in React components can be confusing. This is because optional props
in React components do not always work the same way as optional function arguments.

### Class components

The `Props` type passed to a React component class is the type of `this.props`.
It is not the props types of the component. This is a crucial thing to understand.
Flow infers the prop types of the component using the `Props` type and the
`defaultProps` static field.

A class with an optional prop should be written like:

```js
type Props = {
  name: string,
};

class NameTag extends React.Component<Props> {
  static defaultProps = {
    name: 'Joe Bloggs',
  };
  render() {
    // name is required so no need to null check before calling .split
    const [first, last] = this.props.name.split(' ', 2);
    return <span>{`First name: ${first} Last name: ${last}`}</span>;
  }
}

// consumer doesn't need to pass name prop
const Consumer = () => <NameTag />;
```

Our documentation is smart enough to figure out that a prop is only required
when it is non-optional and has no default prop. Save yourself the extra work of
having to null check optional props by making them required and adding them to
`defaultProps`. For reference, [here](https://flow.org/en/docs/react/components/#toc-using-default-props)
is the section in the Flow docs on optional props.

### Functional components

Optional props in functional React components can be typed the same way as optional
function arguments.

```js
type Props = {
  name?: string,
};

const NameTag = ({ name = 'Joe Bloggs' }: Props) => {
  // name has a default value so no need to null check before calling .split
  const [first, last] = this.props.name.split(' ', 2);
  return <span>{`First name: ${first} Last name: ${last}`}</span>;
};

// consumer doesn't need to pass name prop
const Consumer = () => <NameTag />;
```

The `Props` type indicates that `name` is optional. In `NameTag`, default value
is assigned to `name` which makes the type non nullable inside the function.

## Higher-Order-Components

There are some important points when typing HoCs to ensure component prop types
continue to work as expected. In particular, [the last section of the docs](https://flow.org/en/docs/react/hoc/#toc-supporting-defaultprops-with-react-elementconfig)
shows how to carry over `defaultProps` from the inner component.

```js
function myHOC<Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component,
): React.ComponentType<React.ElementConfig<Component>> {
  return props => <WrappedComponent {...props} />;
}
```

Without using `React.ElementConfig`, the `defaultProps` of the inner component
will be lost and every optional prop will become required. A subtlety of
`React.ElementConfig` is that it returns a type with all the properties marked
as readonly. Depending on what you are trying to do, the `$ReadOnly` Flow
utility function might be useful.

## Refs

The Flow React docs is a good guide to (dealing with refs)[https://flow.org/en/docs/react/refs/].
