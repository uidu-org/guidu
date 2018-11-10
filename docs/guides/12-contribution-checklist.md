# Contribution checklist

Prior to contributing, please make sure you have created an issue to discuss the contribution following our [guide](./contributing).

We rely heavily on contributions outside of our team to make Atlaskit great. In order to maintain a high bar of quality for Atlaskit, we've laid out a few things that we want to make sure are covered in each contribution.

## Development

There's a few aspects of development we'll cover here:

* Testing
* Review
* Documentation

### Testing

The following types of tests are required for all packages:

* Static check (TS or Flow)
* Unit test

However, your component may also require further testing:

* Integration test
* Functional test
* Visual regression test (work in progress)
* Performance test

_For more information on testing components, see the docs on [testing](./testing)._

On top of automated testing, we should also be manually testing our examples on the following platforms / browsers:

* Windows
  * Chrome
  * Firefox
  * Edge
  * IE11
* Mac
  * Chrome
  * Firefox
  * Safari
* Screen readers (when applicable)
    
### Documenting

When documenting a component, there's two things you need to worry about:

* Docs - general documentation for the component.
* Examples - interactive use-cases showing how to use the component.

If you're introducing a new architectural pattern, or something core to the maintenance of Atlaskit, you may also need to add general docs.

If the interaction behaviour or the visuals of the component change, please raise a ticket for a designer to address it on the [ADG website](https://atlassian.design/). 

_See the [component design](./component-design) docs for more information on how all this stuff fits together._

## Review

* Design should review the examples on the [AK website](http://atlaskit.atlassian.com/).
* Ensure a core maintainer is added to the review. They should also approve the PR before it's merged. Core maintainers can be found in the `maintainers` field in the `package.json`.
* If changing the API, try and maintain backward compatibility, if possible.
* Core functionalities should not regress, if they have to change, it should be explicitly part of the plan.

## Released

Once your PR is approved and merged, it will automatically be released on npm and published on the [AK website](http://atlaskit.atlassian.com/).

_See the [versioning](./versioning) and [releasing packages](./releasing-packages) docs for more information on this process._
