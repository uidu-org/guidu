#!/usr/bin/env bash

# echo -e "\e[32m git branch -a"
# git branch -a
echo -e "\e[32m Run changeset version to update versions into packages and commit"
yarn changeset version
echo -e "\e[32m Push last commit into main"
git push HEAD:main > /dev/null 2>&1
echo -e "\e[32m Run yarn build:pkg"
yarn build:pkg
echo -e "\e[32m Publish changeset"
yarn changeset publish --otp=$NPM_TOKEN
echo -e "\e[32m Push to github the updates"
git push --follow-tags > /dev/null 2>&1
echo -e "\e[32m Finishing"
