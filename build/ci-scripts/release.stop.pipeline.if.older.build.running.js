#!/usr/bin/env node
const axios = require('axios');

/*
   This script will automatically end a build if another build of the same branch is already running

   In normal usage, we only use this for preventing multiple master builds from running, but this
   also makes it easy to simulate a master build on a regular branch build. Simply call this script
   from a regular branch build in bitbucket-pipelines.yml AFTER the yarn step (so that you have
   axios installed)
*/

const BUILDS_PER_PAGE = 30;
const BRANCH_TO_CHECK_FOR_MULTIPLE_BUILDS_FOR = process.env.BITBUCKET_BRANCH;
const BB_USERNAME = process.env.BITBUCKET_USER;
const BB_PASSWORD = process.env.BITBUCKET_PASSWORD;
const BITBUCKET_BUILD_NUMBER = process.env.BITBUCKET_BUILD_NUMBER;
const REPO_OWNER = process.env.BITBUCKET_REPO_OWNER;
const REPO_SLUG = process.env.BITBUCKET_REPO_SLUG;
const PIPELINES_ENDPOINT = `https://api.bitbucket.org/2.0/repositories/${REPO_OWNER}/${REPO_SLUG}/pipelines/`;
const TIME_TO_WAIT_FOR_LOGS_UPLOAD_MS = 5000;

const axiosRequestConfig = {
  auth: {
    username: BB_USERNAME,
    password: BB_PASSWORD,
  },
  params: {
    pagelen: BUILDS_PER_PAGE,
    // get the most recent builds first
    sort: '-created_on',
    'target.ref_name': BRANCH_TO_CHECK_FOR_MULTIPLE_BUILDS_FOR,
    'target.ref_type': 'BRANCH',
  },
};

// Stops a currently running Pipelines build
// Related documentation
// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/stopPipeline
function stopPipelineBuild(pipelineUUID) {
  const stopPipelinesEndpoint = `${PIPELINES_ENDPOINT}${pipelineUUID}/stopPipeline`;
  console.log(`Stopping pipline using endpoint ${stopPipelinesEndpoint}`);
  // we'll return the promise and let it be caught outside (first param is just empty form data)
  return axios.post(
    stopPipelinesEndpoint,
    {},
    {
      auth: {
        username: BB_USERNAME,
        password: BB_PASSWORD,
      },
    },
  );
}

axios
  .get(PIPELINES_ENDPOINT, axiosRequestConfig)
  .then(response => {
    const allRunningPipelines = response.data.values;
    const currentPipeline = allRunningPipelines.find(
      job => String(job.build_number) === BITBUCKET_BUILD_NUMBER,
    );
    const olderRunningPipelines = allRunningPipelines
      .filter(
        job => job.state.name === 'IN_PROGRESS' || job.state.name === 'PENDING',
      )
      .filter(
        job => new Date(job.created_on) < new Date(currentPipeline.created_on),
      )
      .filter(job => job.trigger.name !== 'SCHEDULE');

    // if there is another master branch running, we should stop our current one
    if (olderRunningPipelines.length !== 0) {
      // Hypothetically, we should only be able to have 1 at a time...
      const olderRunningPipelineURL = `https://bitbucket.org/${REPO_OWNER}/${REPO_SLUG}/addon/pipelines/home#!/results/${
        olderRunningPipelines[0].uuid
      }`;
      console.log(
        `Another master branch is already running: ${olderRunningPipelineURL}`,
      );
      console.log('Stopping this build to let that one finish');
      console.log(
        'Feel free to re-run this build once that one is done if you like 👌',
      );

      return new Promise(resolve => {
        // we need to wait a bit so that pipelines takes our logs and uploads them before we stop
        // the build
        setTimeout(() => resolve(), TIME_TO_WAIT_FOR_LOGS_UPLOAD_MS);
      }).then(() => stopPipelineBuild(currentPipeline.uuid));
      // We are actually going to let the build continue here as process.exit will return a non-zero
      // return code and we want to leave these as 'stopped', not 'failed'
    }

    console.log(
      'No other master builds seem to be running. Continuing build...',
    );
    return Promise.resolve();
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
