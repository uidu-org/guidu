#!/usr/bin/env bash

# # These are used to sign commits when pushing back to Bitbucket
# # No auth is required as we use ssh from pipelines instead
echo -e "\e[32m  Setting git configs..."
git config --global user.email "$BOT_ACCOUNT_EMAIL"
git config --global user.name "$BOT_ACCOUNT_NAME"
git config --global push.default simple

# # We fetch and checkout master here so that we have a local reference to "master" in other commands
# # (avoids the "ambiguous argument 'master': unknown revision or path not in the working tree" error)
echo -e "\e[32m  Fetching master so that we have a reference to it..."
git fetch origin master
git checkout master # (master doesn't exist until we do this checkout)
git checkout - # checks out the previous ref

# # we rebase at the very top of build so that we'll get any missing release commits.
# # This can introduce a tiny race condition where anything that was merged between us
# # starting and this rebase will get pulled in and released in this build. This is much
# # better than the alternative of pulling later and not testing the code
if [ "$TRAVIS_BRANCH" = "master" ]; then
  echo -e "\e[32m  Rebasing on master to ensure we have all release commits from master..."
  git pull --rebase origin master
fi

echo -e "\e[32m  Setting npm registry token"
# $NPM_TOKEN is the auth token for the "uidu" user
npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN
# For some reason, the npm dist-tag commands are hitting yarnpkg and not npmjs
npm set //registry.yarnpkg.com/:_authToken=$NPM_TOKEN


echo -e "\e[32m  Setting Yarn registry and token"
yarn config set _authToken $NPM_TOKEN
yarn config set registry https://registry.npmjs.org/

npm config set python $(which python)

# Forces `chalk` to display colored output in pipelines
export FORCE_COLOR=1
yarn config set color always

echo -e "\e[32m  Yarn config list"
yarn config list

echo -e "\e[32m  NPM config list"
npm config list

# We had issues where private registry where found in the yarn.lock. This test ensures, you are not adding it back.
test -z "$(cat yarn.lock | grep "packages.atlassian")" || (echo "Private registry found in yarn.lock - check your local ~/.npmrc remove it and regenerate the lockfile" && false)

# React Popper needs to be pinned to 1.0.2 until the recursion bugs with it are fixed
# (check their repo https://github.com/FezVrasta/react-popper)
# test -n "$(cat package.json | grep "\"react-popper\": \"1.0.2\"")" || (echo "React Popper needs to be pinned to 1.0.2 until the recursion bugs with it are fixed (check their repo https://github.com/FezVrasta/react-popper)" && false)
