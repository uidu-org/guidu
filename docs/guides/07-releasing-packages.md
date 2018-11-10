# Committing code & releasing packages

Related reading:

* [Versioning](./versioning)

## Committing your code

`git add .`

`git commit -m "your message here"`

This will run prettier over your changed files before doing a commit.

## Releasing packages

Packages that have been changed will not automatically be released. Instead, you
need to create a changeset. A changeset is an empty commit that informs the
release process of what packages to release. Generating a changeset is done
through a command, that walks you through the choices you need to make.

To start creating a changeset, you need to run

Start creating a changeset `bolt changeset`

### Step 1: Select packages to release

You will be prompted to select packages to release. This will be divided into
packages that have changes since their last release, and other packages (if you
believe something will need updating).

Press space to select an item, and enter once you have made your selection of
releases.

### Step 2: Write a summary of the release

You will be prompted to write a summary. This will be used in the changelog for
the packages you have selected to release.

### Step 3: Select Versions

For each package you have chosen to release, you will be prompted to select a
version of that package. This will need to be either 'patch', 'minor', or
'major'.

You will also be prompted to select a version range for internal packages that
may need their version bumped. If none of its dependencies are currently leaving
its dependency range, you will be offered a 'none' options, however if this
later becomes untrue, you will need to reselect a version.

Once you have made all choices about packages to be released, you will be shown
the changeset object and confirm if you wish to commit it.

## Hotfix process (patching older versions)

Hotfix releases are possible but should be avoided where **at all possible**. They introduce lots of room for mistakes and create a manual maintenance problem that we'd like to avoid.

> **All hotfixes must be approved by either the build team or that Atlaskit architect**

**Process**

1. Checkout the commit or tag you are branching from and create a new branch from there. e.g.

```
git checkout @atlaskit/avatar@1.1.0               # you will be in a detached head state
git checkout -b hotfix/avatar-hotifx-for-stride   # create the new branch
```

2. Ensure that your workspace is completely clean (this ensures any testing isn't affected by changes on your local machine).

```
git clean -dfx    # removes all untracked files and directories
```

3. Perform normal `bolt install`

```
bolt install
```

4. Apply manual changes and test **thoroughly**. It is extremely important that this is done correcly. How you test will depend on exactly what you are fixing, but in general building the package you are changing and `yarn link`'ing it will be useful.

5. Once you are completely satisfied that the change is correct, manually change its version. It's best to give it a very descriptive version that is easy to verify and know that it is a hotfix. It is common to add a number to the end in case you need to do more fixes (it is bad, but this is a very error-prone operation).

```
"name": "@atlaskit/avatar"
"version": "1.1.0-hotfix-patched-proptypes.1"
```

6. Commit the work to your branch with a git tag and descriptive message (no changeset required). The `-m` flag is very important here as `git push --follow-tags` behaves strangely depending on if this is present.

```
git commit -m "Hotfix for avatar to expose forgotten proptypes in version 1.1.0"
git tag @atlaskit/avatar@1.1.0-hotfix-patched-proptypes.1 -m "@atlaskit/avatar@1.1.0-hotfix-patched-proptypes.1"
```

7. Ensure that **all** steps towards building said package are completed. Again, this will depend on the specific package being patched. The easiest way to do this is to look at the `build` script in the root `package.json` and follow all the things happening there and manually run all the ones pertinent to your package.

8. Manually triple check that the built `dist` looks correct. Compare it to a previous version on `npmcdn` (i.e `https://npmcdn.com/@atlaskit/avatar@1.1.0/dist/). Does it have the right directories, files, etc, do the exports looks right.

9. Ensure that you are logged in as the `atlaskit` npm user (get these credentials from lastpass if requried).

```
npm whoami
```

10. Run `npm publish` in the packages directory. The `--tag` argument is passed to make sure npm doesnt mark this release as `latest`, which is does by default.

```
cd packages/core/avatar
npm publish --tag="hotfix"
```

11. Confirm that we definitely haven't changed the `latest` tag

```
npm info @atlaskit/avatar version # confirm this is not the one we've just published.
```

12. Push the branch with tags up for future reference.

```
git push --follow-tags
```
