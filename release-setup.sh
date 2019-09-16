#!/usr/bin/env bash

# echo -e "\e[32m git branch -a"
# git branch -a
echo -e "\e[32m Run changeset version to update versions into packages and commit"
yarn changeset version
echo -e "\e[32m Push last commit into master"
git push https://${GH_TOKEN}@github.com/uidu-org/guidu.git HEAD:master > /dev/null 2>&1
echo -e "\e[32m Setting git configs..."
yarn build:pkg
echo -e "\e[32m Setting git configs..."
yarn changeset publish --otp=$NPM_TOKEN
echo -e "\e[32m Setting git configs..."
git push https://${GH_TOKEN}@github.com/uidu-org/guidu.git --tags > /dev/null 2>&1
echo -e "\e[32m Setting git configs..."
