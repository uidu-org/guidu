TODO data-views

- [x] pinned columns
- [x] row actions
- [x] global filters
- [ ] sortingFn => this wasn't working before either
- [ ] controlled state

- Migration guide for users

1. First, redefine columns in components that use the data-views component and use columnHelper with the provided meta.
2. Make components controlled from outside, with state handlers for filtering, sorting, grouping and global filtering (that may be well extracted into ContextSearch), as well as for pagination. Actually, the only controlled option should be pagination, and maybe grouping, the others are just fine with react-table state, but should trigger a new data load.
