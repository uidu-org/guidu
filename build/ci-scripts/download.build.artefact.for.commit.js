const fs = require('fs');
const path = require('path');
const npmRun = require('npm-run');

const BITBUCKET_COMMIT = process.env.BITBUCKET_COMMIT;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET_NAME = 'atlaskit-artefacts';
const BUCKET_REGION = 'ap-southeast-2';

if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
  console.error(
    'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
  );
  console.error('These env variables need to be set to be able to s3');
  process.exit(1);
}

if (process.argv.length !== 3) {
  console.error(`Usage ${path.basename(process.argv[1])} relative/path/on/s3`);
  process.exit(1);
}

const commitHash = BITBUCKET_COMMIT.substring(0, 12);
const filePath = process.argv[2];
const remotePathToFile = `s3://${BUCKET_NAME}/${commitHash}/${filePath}`;
const localFileName = path.basename(filePath);

npmRun.sync(
  `s3-cli --region="${BUCKET_REGION}" get ${remotePathToFile} ${localFileName}`,
);
