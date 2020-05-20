#!/bin/bash

echo "\033[0;32mConfiguring GitHub credentials\033[0m"
if [ -n "$GH_DEPLOY_TOKEN" ]
then
    touch ~/.git-credentials
    chmod 0600 ~/.git-credentials
    echo $GH_DEPLOY_TOKEN > ~/.git-credentials
    git config credential.helper store
    git config --global user.email "me+travisbot@estebantorr.es"
    git config --global user.name "Esteban Torres via Travis CI"
    git remote add upstream "https://${GH_DEPLOY_TOKEN}:x-oauth-basic@github.com/esttorhe/esttorhe.github.io.git"
fi

echo "\033[0;32mBuilding website...\033[0m"
sudo rm -rf site/public
git worktree add -B master site/public upstream/master
sudo rm site/public/*
make build
cd site/public

echo "\033[0;32mDeploying updates to GitHub...\033[0m"
git add .
git commit -m "Rebuild site"
# git push --force origin HEAD:master
