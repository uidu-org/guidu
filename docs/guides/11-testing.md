# Testing in Atlaskit

We encourage adding tests to all components on **Atlaskit**.

**Jest** is the testing framework across all types of tests in Atlaskit.

## Testing support as of today includes
### Unit tests
- write unit test for component using **Jest test framework**.
- *unit tests* for packages should be structured under `<pkg>/src/__tests__/unit` folder.
- on CI these are run against changed packages only.
- run all tests `yarn test`.
- run all tests in watch mode `yarn jest --watch `.
- run test for changed packages `yarn test:changed`.
- run single test `yarn test <path_to_test_file>`.
- run tests under certain directories `yarn jest <path_to_directory>`.

### Browser unit tests
- some components require unit tests which can be run against **real browser**.
- these tests use *jest-karma runner*.
- *browser unit tests* for packages should be structured under `<pkg>/__tests-karma__`.
- on local these run against 2 browsers  (Chrome and FF).
- on CI these run against 5 different browsers across OS for changed packages only.
- to run on local `yarn test:browser`.
- to run on *browserstack* :
    - set `BROWSERSTACK_USERNAME = <username>`.
    - set `BROWSERSTACK_KEY = <userkey>`.
    - run all *browser unit test* `yarn test:browser:browserstack`.

### Browser Webdriver/Integration tests
- webdriver tests are used to test actual behavior of component inside of browser on **user interactions**.
- use **Jest runner** for running the webdriver tests.
- *webdriver tests* for packages should be structured under `<pkg>/src/__tests__/integration`.
- on local these run against 2 different browsers (Chrome and FF).
- on CI these are run against 5 different browsers across OS for changed packages only.
- to run all *webdriver tests* on local `yarn test:webdriver`.
- to run all tests under a package on local `yarn test:webdriver <pkg>`.
- to run all tests under certain directories on local `yarn test:webdriver <path_to_to_directory>`.
- to run single test on local `yarn test:webdriver <path_to_file>`.
- all the commands above can be run using *watch mode* :
    - `yarn test:webdriver:watch` will run watch mode headlessly.
    - `yarn test:webdriver:watch:chrome` will run watch mode only on Chrome browser.
- to run on *browserstack*:
    - set `BROWSERSTACK_USERNAME = <username>`.
    - set `BROWSERSTACK_KEY = <userkey>`.
    - run all *webdriver tests* `yarn test:webdriver:browserstack`.
    - run all tests under a package `yarn test:webdriver:browserstack <pkg>`.
    - run all tests under certain directories `yarn test:webdriver:browserstack <path_to_to_directory>`.
    - run single test `yarn test:webdriver:browserstack <path_to_file>`.

For further details or a test template, please consult this [link](https://hello.atlassian.net/wiki/spaces/AtlasKit/pages/136112313/How+to+add+webdriver+browser+tests+for+components+in+Atlaskit).

### Visual regression tests
- visual regression tests are used to identify visual differences on **UI components** with or without **user interactions**.
- use **Jest runner** for running the visual regression tests.
- *visual regression tests* for packages should be structured under `<pkg>/src/__tests__/visual-regression`.
- on local these run using jest-image-snapshot, puppeteer and chromium.
- to run all *visual regression tests* on local `yarn test:vr`.
- to run all tests under a package on local `yarn test:vr <pkg>`.
- on CI to run all packages in pipeline as a custom build, go to any branch, run pipeline for a branc and select **custom build:visual-regression**.
- on CI, after every chamge to master branch, it runs all the vr tests.

For further details or a test template, please consult this [link](https://hello.atlassian.net/wiki/spaces/AtlasKit/pages/136113035/How+to+add+visual+regression+tests+in+Atlaskit).

### Flow tests

- flow tests can be used to explicitly verify that components are being typed correctly from the consumers perspective.
- they are especially useful for testing that HOC are typed correctly and don't result in types from the original component being lost
- these tests are unique in that they are just code that is typechecked by flow instead of executed
- to test valid component usages, simply use your component with valid props and flow will error if there is a problem
- to test invalid component usages, use your component with missing/invalid props and add an `// $ExpectError - invalid xxx prop` comment above it. Flow will then warn when
it does *not* detect any flow errors from an invalid usage of your component
- *flow tests* for packages should be structured under `<pkg>/src/__tests__/flow`
- on both local and CI, these will be executed as part of flow typechecking, `yarn typecheck:flow`.
- there is no way to only test a specific directory as flow is executed on an app level.
- to disable specific tests, you will need to comment out code failing flow typechecking or remove/edit $ExpectError comments so they are not flagged as unused.

## We use a forked version of Enzyme

Why? Please [see the explanation on Github](https://github.com/petegleeson/enzyme#this-is-a-forked-version-of-enzyme-%EF%B8%8F).

### Do I need to use the forked version of Enzyme?

If you are using Enzyme and are rendering a component that uses the React 16.3 `forwardRef` API,
then yes you will. We will be doing a major release for each component that is upgraded to use `forwardRef`.
Checking the release notes is the best way to tell whether a component is using `forwardRef`.

### How do I use the forked version of Enzyme?

We have tried to make the fork as much of a drop in replacement as possible. See [this section on Github for instructions](https://github.com/petegleeson/enzyme#using-this-fork).
