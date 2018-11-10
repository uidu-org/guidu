# Error handling

Related reading:

* <https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html>

## How Atlaskit components should report errors

Our components will throw errors when necessary. They should not have error boundaries unless it is necessary to the functioning of that component. 
If a component does create an error boundary, that component should then re-throw so that the parent tree can handle the error accordingly. 
The reasoning behind this is that apps will need to do their own error reporting and we shouldn't be preventing that by swallowing the errors.

## How consumers should report the errors

Consumers should use the `componentDidCatch` lifecycle in their own components to handle any errors our components produce according to their practices.
