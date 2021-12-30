---
'@uidu/data-controls': major
'@uidu/data-manager': major
'@uidu/board': minor
'@uidu/gallery': minor
'@uidu/list': minor
'@uidu/table': minor
'@uidu/calendar': patch
'@uidu/dashboard-controls': patch
'@uidu/dashboard-manager': patch
'@uidu/dashlet-controls': patch
'@uidu/dashlets': patch
'@uidu/dashlets-form': patch
'@uidu/data-fields': patch
'@uidu/data-views': patch
---

Data-manager refactor away from render props pattern

# Breaking Changes

DataManager no longer accepts render props for the `children` prop. You should use these new components:
- DataManagerControls
- DataManagerView
- DataManagerFooter

Pagination is now included by default, it now splits items into pages client-side.
