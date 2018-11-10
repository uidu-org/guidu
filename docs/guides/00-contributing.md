# Contributing

Related reading:

* [Contribution checklist](./contribution-checklist)
* [Component design](./component-design)
* [Directory structure](./directory-structure)
* [Adding new icons](./adding-new-icons)
* [Releasing packages](./releasing-packages)
* [Versioning](./versioning)

## Code of Conduct

This project is bound by a [Code of Conduct](https://bitbucket.org/atlassian/atlaskit-mk-2/src/HEAD/CODE_OF_CONDUCT.md).

## Introduction

Although it's our job to look after all the components in our repo, we rely heavily on contributions outside of our team to make Atlaskit great. At its core, our contrubution model is very much like contributing to any open source library, but because we get several contributions from within Atlassian from other teams, we have the ability to build on that model to help make inter-team contributions more efficient.

## Open source contribution model

If this is your first time or if you don't have permission to create a branch, follow the instructions under 'Become a contributor' in our [README.md](https://bitbucket.org/atlassian/atlaskit-mk-2/src) to request permission.

We want to keep this model very simple. At it's core, we make the assumptions that developers looking to contribute will look at the `README.md` and thus, be directed to the `CONTRIBUTING.md`. Even so, both of those files are widely known as convention in an open source project and developers will be able to direct themselves there.

The process consists of:

1.  Raise an issue for discussion. This step may not even be necessary as this could all be done in a PR, depending on if the contributor is willing to lose work if the contribution doesn't get accepted.
2.  Submit a PR resolving the raised issue.

This is super simple and the PR guidelines can be derived from the rest of our conventions and documentation. It's also compatible with the inter-team model, because, at the very worst, internal teams would still be able to follow this process.

The only real downsides here are that:

1.  It can take longer to yield a merge due to async discussions.
2.  Discovery of contribution need is mostly up to the contributor, unless we reach out to them.

The inter-team model expands on the open source model to make this process more efficient because we have the privilege of working with internal teams in such a way.

## Inter-team contribution model

Like the open source model, the inter-team contribution model is kept as light as possible and is designed for compatibility with it so that, at worst, we can fallback to the open source model as teams in other timezones may not be able to meet as easily.

The different aspects of the inter-team contribution are the following:

* [Introduction](#introduction)
* [Initial discussion](#initial-discussion)
* [Regular catch-ups](#regular-catch-ups)
* [Shepherd involvement](#shepherd-involvement)
* [Tracking ](#tracking)
* [Contribution requirements](#contribution-requirements)
* [Handover and maintenance](#handover-and-maintenance)

### Introduction

The contribution may be initially sparked by several methods:

* Water-cooler discussion with a colleague.
* Issue raised by another team.
* Atlaskit team member noticing similar implementations in products and raising it.
* Any sync meetings between teams.

### Initial discussion

Regardless of how the discussion is triggered, we want to be clear on a few things:

1.  Any initial action items.
2.  Decide who will be the contributor from the external team.
3.  Decide who will be the shepherd from within the Atlaskit team.

This process may come naturally and not require an initial meeting. For example, a contribution may be very simple, a PR may have already been made and it may be good to go out of the gate. Others may require a bit more formality to keep the quality bar high.

A more complete process may look like: introduction > discuss approach and plan > spec / prototype review > raise PR > discuss and merge > high five.

_We don't want this process to to impede the contribution, waste anyone's time or to appear like the waterfall process. You should decide up front if the complexity if the contribution warrants such process and always be mindful to keep it as lean as possible._

### Regular catch-ups

Since these two components can affect one another, everyone involved should keep in constant communication. Therefore it's a good idea if a regular catch-up is scheduled between interested parties to keep the feedback loop tight. These catchups may be simply stand-ups, or might be more involved and contain demos of work progress. The complexity of these will be unique for each contribution.

Some examples of this are:

* Daily stand-ups
* Weekly catch-ups
* Demos every other day
* Creating a Stride room for regular communication

The people involved in these catch-ups will vary, as well. For example, it may simply be the contributor and shepherd. It may have a designer present. Other team members may be involved depending on the complexity.

_The key here is that everyone shares knowledge and can hold each other accountable as everyone may have several things on their plate at any given point in time._

### Shepherd involvement

Every contribution will have a shepherd, but to the extent at which this shepherd will be involved will vary. For example, a shepherd may or may not write code depending on their workload and the needs of the contributor. At minimum, shepherds must:

* Review relevant PRs.
* Meet with contributors, or involved parties.
* Plan any follow ups after the final contribution and handover has been made.

### Tracking

The shepherd should raise an issue internally to track the overall process and give it a label of "contribution".

### Contribution requirements

To keep the quality bar high, we should do our best to ensure the contribution closely matches our general component design [guidelines](#component-design) as well as the following:

* [Directory structure](./directory-structure)
* [Naming props](./naming-props)
* [Using higher-order components vs render props](./hoc-vs-props)
* [Using `Component` vs `PureComponent`](./component-vs-pure-component)

### Handover and maintenance

In an ideal world, the contributor would be able to support the component for some time after mergin. This isn't always the case, however. Either way, we should ensure that both the shepherd and contributor - in that order - are mentioned as the `maintainers` in the `package.json`. The first person listed - the shepherd - will be the primary point of contact. The second person listed - the contributor - will be the secondary point of contact, just in case, since they were the ones that contributed it.

Over time, this may evolve and both the contributor and shepherd may be removed in favour of a new maintainer. This is fine and should be considered normal.
