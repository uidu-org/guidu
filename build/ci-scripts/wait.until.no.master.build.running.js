#!/usr/bin/env node
const axios = require('axios');
const pWaitFor = require('p-wait-for');
/*
   This script is a stop gap solution until this code is moved into landkid.
   It simply waits until there is no build running in master.
   We run this at the end of a landkid build so that we never merge a PR whilst
   master is still running.
*/

const BUILDS_PER_PAGE = 30;
const REPO_OWNER = process.env.BITBUCKET_REPO_OWNER || 'atlassian';
const REPO_SLUG = process.env.BITBUCKET_REPO_SLUG || 'atlaskit-mk-2';
const PIPELINES_ENDPOINT = `https://api.bitbucket.org/2.0/repositories/${REPO_OWNER}/${REPO_SLUG}/pipelines/`;
const INTERVAL = 15000;

const axiosRequestConfig = {
  params: {
    pagelen: BUILDS_PER_PAGE,
    // get the most recent builds first
    sort: '-created_on',
    'target.ref_name': 'master',
    'target.ref_type': 'BRANCH',
  },
};

function noMasterRunning() {
  console.log(+new Date(), 'Checking if master is running...');
  // We add a queryString to ensure we dont get cached responses
  return axios
    .get(`${PIPELINES_ENDPOINT}?${+new Date()}`, axiosRequestConfig)
    .then(response => {
      const allPipelines = response.data.values;
      const runningPipelines = allPipelines
        .filter(
          pipeline =>
            pipeline.state.name === 'IN_PROGRESS' ||
            pipeline.state.name === 'PENDING',
        )
        // remove the scheduled builds (website, etc)
        .filter(job => job.trigger.name !== 'SCHEDULE');
      console.log(runningPipelines.length, 'master build running');
      return runningPipelines.length === 0;
    });
}

console.log(
  'Waiting until there is no master build running so that we can merge...',
);

pWaitFor(noMasterRunning, 5000);
