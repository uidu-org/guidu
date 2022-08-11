TODO data-views

- [x] pinned columns
- [x] row actions
- [x] global filters
- [ ] sortingFn => this wasn't working before either
- [ ] controlled state

- Migration guide for users

1. First, redefine columns in components that use the data-views component and use columnHelper with the provided meta.
2. Make components controlled from outside, with state handlers for filtering, sorting, grouping and global filtering (that may be well extracted into ContextSearch), as well as for pagination. Actually, the only controlled option should be pagination, and maybe grouping, the others are just fine with react-table state, but should trigger a new data load.

# desired api

## Option 1: table instance in initiated inside data-manager

Implementing a function like this that spreads meta and column definition

```jsx
const mergeByName = (passedMeta) => {
  const { meta, ...rest } = byName(passedMeta.kind);
  return {
    ...rest,
    meta: {
      ...meta,
      ...passedMeta,
    },
  };
};
```

### Cube

```jsx
columnDef = {
  'Users.id': {
    meta: {
      kind: 'uid',
      isPrivate: true,
    },
  },
};
```

Inside DataManagerCube (to be deprecated):

```jsx
const columns = Object.keys(columnDefs).map((key) => {
  const { meta, ...column } = columnDefs[key];
  return {
    ...mergeByName(meta),
    ...column,
  };
});
```

### Graphql

Inside the component that uses the data-manager component.

```jsx
columns = [
  columnHelper.accessor('id', {
    meta: { kind: 'uid', isPrivate: true },
  }),
  columnHelper.accessor('foo', {
    meta: { kind: 'string', isPrivate: true },
  }),
];
```

Inside data-manager

```jsx
const columnDefs = [...columns.map({ meta, ...column} => ({
  ...mergeByName(meta)
  ...column,
}))]
```
