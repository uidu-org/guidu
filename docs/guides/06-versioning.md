# Versioning

Related reading:

* [Releasing packages](./releasing-packages)

> All components must follow [Semver](http://semver.org/). For new components they should start in what's called "dev releases" at 0.0.0. While a component is in dev releases, it is considered unstable and not bound by normal Semver rules for versions above the first major release (1.0.0).

> Although Semver leaves dev releases open to do anything you want, we will only make breaking changes in minor versions (i.e. 0.1.0). Features and non-breaking patches will still go into their normal versions. Basically, we still follow Semver in dev releases except that breaking changes go into minor releases.

For the sake of keeping things simple, refer to the [Semver spec](http://semver.org/) for anything this document does not cover.

## Dev releases

All components, whether they are being started fresh or being converted from another implementation, should start in dev releases. There's a few reasons for this.

### Shipping often

We move fast and want to ship often. We don't want our consumers to be twiddling their thumbs at perfection. While stability is important, it's also important that we iterate during the build phase and are able to ship functionally atomic pieces until it reaches a 1.0.

This not only gives consumers an insight to a component's API and functionality, it allows us to have a discussion about them and further harden them if necessary.

### Conveying stability

Versions do matter. If we release something at 1.0 and say we follow Semver, it tells consumers that this API is ready for prime time. If we realise we made some mistakes and have to reiterate them, it may cause some breaking changes. Using dev releases here gives us a grace period where we can harden a component while a consumer uses it. We will always have early adopters and later adopters. Let's leverage the former to help the latter.

*A version should specifically outline the overall stability of the component and where it's at in its greater evolutionary lifecycle.*

### Striking a balance

We want as many contributions as possible and we want to make the process as simple as possible for both parties.

For contributors, they want to feel empowered to make a useful contribution. Their time is also very limited, so we must respect that and use it as best as possible. For reviewers, we want to empower contributors and, like them, our time is also very limited.

It's important to strike a balance here because the more contributions we get, the better it is for us because it takes the brunt of the initial weight off our shoulders. By contributing components into our repo as dev releases, it allows contributors a bit more leeway in terms of getting an initial iteration into Atlaskit. Even if it has some nits and some things that need work, using dev releases gives us time to polish those off before going 1.0.

## Versioning examples

Some examples of what would fall under the abstract semver umbrella:

1. **MAJOR** version when
  - Change named exports exposed via the main entry point.
  - Changing and renaming public props.
  - Making a public prop more restrictive in what it accepts.
  - Change named exports exposed via the main entry point.
  - Icon sizes changing.
  - Changes in CSS that can affect layout outside of a component. For example, changing display property from flex to block and vice-versa.
  - Upgrade peer dependencies.
  - You've made a visual change in a component that could affect someone using the public API. Box sizing could affect positioning, or child content. The value of a predefined prop like `size="xlarge"` could fall into this. These are addressed on a component-by-component basis.
2. **MINOR** version when
  - Anything that has a leading underscore.
  - Anything inside render(). This includes elements, attributes and classes. For example, add / removing attributes or changing text content. Some integration tests may be relying on this, but it's still not a breaking change. It won't break you in production if you're using caret versions from NPM. It'll break your tests, but you'll update those prior to releasing anything. *We'll do our best to notify products of changes like this.*
3. **PATCH** version when
  - update package dependencies
  - Directory structure changes
    - Reworking our directory structure. We offer a `dist/esm` build where the module field in the `package.json` points to the entry point within that folder. There should be no reason to reach into packages.
4. **NO RELEASE** when
  - Update dev dependencies (including `flow-bin`)
  - Add tests or examples
  - Update examples
  - Update internal documentation

## Flow and our public API

Flow - and types, in general - are a development tool. They augment your workflow and provide static analysis of the code you're writing, but they do not provide a public API for anything that you write. Strictly speaking, updating a dev dependency should not bump any versions at all. This is outlined in our versioning guidelines above.

If types informed version numbers of a public API, it's very likely that we would be releasing only major versions. Many times, when making changes to types, or a type system, you're making a breaking change.

For this reason:

* Updating `flow-bin` should not trigger a release unless you have to update types for certain components.
* Updating Flow types within a component should trigger a release of the appropriate type and be called out in the changelogs.

If you were to change the return type of a function in your public API, this alone should does not mean you are releasing a major version. The fact that you are expecting a different type of value does, even if no code change is required. Most times, an update to your types will correspond to an update in your code, or your expected public API.

If you're fixing a bug, you might change a type that ends up getting exported, but it may not affect your public API. In this scenario, you'd release a patch, even though the type might cause errors once consumed during development.

_Our stance on versioning and Flow types is subject to change as we learn more about how it affects consumers, so feedback is welcome._

## Deprecating and discontinuing support

Deprecating and eventually discontinuing the support of a package is never something we take lightly.

### Communicate intent

First and foremost, we should communicate our intent to deprecate and give reasoning. Internally, we should notify our consumers directly and discuss the ramifications of deprecating and eventually removing the package in question. It's also a good candidate for a blog post to get a wider opinion.

### Consider making the package private

Consider making the package private by setting `internal` flag to true in package.json. Ex:

```js
  // package.json
  {
    "atlaskit": {
      "internal": true
    }
  }
```

This will make the component not show up on Atlaskit website.

### Deprecate

Based on the response to the communication, we should come up with a reasonable deprecation timeline where we still support the component and may offer bugfixes, but will discontinue feature development.

#### Add deprecation notice to package docs

We should add a deprecation notice to the top of the component docs that says something like:

> This package is deprecated and will be supported until [insert date].

If there is an alternative package, then documenting it would also be a good idea.

> This package is deprecated and will be supported until [insert date]. We recommend using [x package] instead.

Use @atlaskit/section-message component with appearence set to "error" in order to make the deprecation notice
visible in the component docs.

You can see examples of deprecation notices using SectionMessage in @atlaskit/single-select component docs.

#### Run `npm deprecate`

The `npm deprecate` command deprecates a version of a package, but it can be run on a version range. We should run this on the current version and any future versions and specify the same message that we put in the docs.

#### Wait it out

During the deprecation period, we may need to push a critical bug fix or two. We should strive not to have to do this, and encourage alternatives.

#### Communicate one last time

Give one last heads up to consumers. Internally this can be done via internal comms. This is also a good candidate for a blog post, but we do not need to wait for feedback at this point.

Go ahead and move on to the next step.

#### Delete!

Once you've notified everyone, create a PR deleting the package from our repository. No action needs to be taken on NPM as it's already deprecated and we don't want to unpublish it as it will probably still be depended on for some time.
