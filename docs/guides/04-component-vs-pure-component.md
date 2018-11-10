# Component vs PureComponent

Related reading:

- <https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81>
- <https://github.com/facebook/react/issues/8184>
- <https://news.ycombinator.com/item?id=14418576>

Since we're a component library, if we used `PureComponent` for our components, we'd be having an opinion on how we should re-render. This can cause issues down the tree and becomes apparent if an app is responding to changes in context. If we used `PureComponent`, anything underneath a component that extends it would prevent renders from happening down the tree.

Given the recommendation from Sophie Alpert (comment username: spicyj) on the Hacker News thread, we should err on the side of caution here and use `Component` for everything. Most times, if you're setting props, you want to render. If you need to check to prevent a render, we should be hand-crafting `shouldComponentUpdate` ourselves (if the product can't do it for some reason) because we'd be being explicit about what we need to check. As a last resort, we can use `PureComponent` if we'd be implementing the exact same checks.
