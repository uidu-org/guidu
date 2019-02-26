function isRunningInPipelines() {
  const CI = process.env.CI;
  const BITBUCKET_BUILD_NUMBER = process.env.BITBUCKET_BUILD_NUMBER;
  return !!CI && !!BITBUCKET_BUILD_NUMBER;
}

module.exports = isRunningInPipelines;
