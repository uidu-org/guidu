# @atlaskit/webpack-config

## 2.0.4
- [patch] suppress "export not found" warnings for ts transpiling in webpack [9baa015](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9baa015)

## 2.0.3
- [patch] Upgrade to webpack 4 [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)
- [patch] Updated dependencies [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)
  - bolt-fs-loader@0.0.1

## 2.0.2
- [patch] Migrate Profilecard to AKM2 DIR-553 [9bac948](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bac948)

## 2.0.1
- [patch] adds environment variable for whether the atlaskit website is running locally, in staging or in production [a04c1c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a04c1c5)

## 2.0.0
- [major] Updated website to use iframe to load examples. Example loader now in a separate react app. Webpack config refactored to compile separate example loader, chunking refactored to be more performant with the new website changes. Updated modal-dialog to use new component structure to optionally specify a Body wrapping component. [e1fdfd8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1fdfd8)
