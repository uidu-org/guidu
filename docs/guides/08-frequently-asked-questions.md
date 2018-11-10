# Frequently Asked Questions

We will use this page to answer any frequently asked questions or common pitfalls / mistakes when developing.

If you find an issue that isnt addressed in this page, feel free to add it!

Related reading:

* [versioning](./versioning)
* [releasing-packages](./releasing-packages)

## Why can't I create a branch to create a pull request? Should I fork this repository?

Please don't fork this repository for pull requests. Instead, request permission to create branches by follwing the instructions under "Become a contributor" section in our [README.md](https://bitbucket.org/atlassian/atlaskit-mk-2/src).

## How do I release a change once it's merged?

See the related reading above^ ([releasing-packages](./releasing-packages)) (hopefully before you've merged...).

## I created a changeset but I'm still being warned that no packages will be released. Why?

It's possible you hit `<enter>` to select a package rather than `<space>`, thus selecting no packages.

We're planning to prevent you from doing this, but for now, simply create a new changeset with the correct packages selected (removing the old commit if possible).

## The changeset command is asking me about "bump types" of packages I didn't touch... Is it broken?

No. The changeset command will ask you about the bump types of all packages you are releasing and also all of their dependents. In general if you are presented with a "none" option, this *should* be safe to select as it measn the change you are making to a package will not cause it to leave a dependents semver range.

> i.e. if `pkg-a` depends on `pkg-b@^1.1.3` and you are releasing `pkg-b@1.2.0`, then hypothetically, it should be safe to not bump `pkg-a`'s dependency. The exception to this would be when you then want to *consume* a change in `pkg-b` that came in at a certain version. At this point, you'd want to update `pkg-a` to depend on the correct range.

## The changeset command is asking about a **lot** of packages that I haven't touched... Is it broken?

No. The changeset command will ask you about the bump types of all packages you are releasing and also all of their dependents. A common package like `editor-core` or `button` might end up releasing **a lot** of packages if you are doing a major versions bump for example.

There are times when it might ask you about the same package twice. This can happen if, for example, you are releasing a package `C` that `A` and `B` depend on where `B` also depends on `A`. You might be asked "What kind of change is this for `B`?" which you might select `none` (this is fine, as `C` is not leaving `B`'s dependency range). However, if it then asked, "What kind of change is this for `A`?" and answered `major` (or any answer that causes `A` to leave `B`'s depdendency range) you will need to be reprompted (as `B` **needs** to be released since one of its deps has been updated and the repo will be in an invalid state otherwise).

## I created a changeset commit, but after rebasing, I can't see it anymore. Am I crazy?

No (most likely). Unfortunately the default behaviour of rebasing is to remove empty commits, which changeset commits *can* be.

One solution is to not make empty changeset commits (**reccomended**) or to use the `--keep-empty` flag when rebasing.

```
git rebase -i --keep-empty origin/master
```

### I'm getting a failure in CI during the `build` step that has nothing to do with my changes. Is this normal?

Yes (sort of). It's a known issue that we believe is caused by a race condition between some of the `TypeScript` components.

We are tracking the issue [here](https://ecosystem.atlassian.net/browse/AK-3974) and will likely be solving it with [this](https://github.com/thejameskyle/graph-sequencer) (currently WIP).

In the meantime, simply rerunning should solve the issue (eventually...).

## Master has gone red suddenly and is complaining about not depending on the latest version of an internal package. What gives?

There are a couple of ways this can happen. At it's core, the issue is when a branch is merged that was not up to date with master.

For example:

```
-> pkg-a is released at 1.2.0 (all dependents are updated to ^1.2.0)
-> new branch is created to introduce pkg-b
-> pkg-a is bumped to 2.0.0 (all dependents are bumped to ^2.0.0)
-> pkg-b branch is merged (without rebasing on master)
-> master is now red because pkg-b still depends on pkg-a@^1.2.0
```

This can be avoided by keeping branches as up to date as possible and will be mitigated completely with the introduction of `Landkid` (see [AK-4053](https://ecosystem.atlassian.net/browse/AK-4053)).

## I pulled down a patch / minor version of a component and am getting Flow errors. Why wasn't this a breaking change?

See: [versioning](./versioning#flow-and-our-public-api).

## Why don't you provide TypeScript definitions from your Flow components?

Our stance is very similar to the [stance](https://github.com/atlassian/react-beautiful-dnd/issues/334#issuecomment-367150672) we've taken on react-beautiful-dnd.

We acknowledge that types provide a certain level of convenience on top of documentation that is nice to have. However, it places a great deal of maintenance burden on our teams to maintain. Therefore, we will not be providing types for other JavaScript supersets besides Flow for the forseeable future.

We will not discourage others from maintaining types for our components, but we will not be supporting their maintenance, including having them co-located with the components within Atlaskit. We suggest types go in the canonical [definitely-typed](https://github.com/DefinitelyTyped/DefinitelyTyped) repository.

Types are definitely nice to have, and we realise that maintaining them in a separate repo may be more difficult than co-located with the components. However, we kindly ask that you respect our decision. Thank you.
