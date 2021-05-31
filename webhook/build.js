const path = require('path');
const exec = require('child_process').exec;
const os = require('os');

const logger = require('./logger');

const REPO_PATH = path.join(__dirname, '..');
const BUILD_COMMAND = 'npm run build';
const SYNC_DIRECTORY = path.join(os.homedir(), 'public');

function build() {
  return new Promise((resolve, reject) => {
    logger.info('STARTED BUILD');
    console.time('build time');
    exec(
      BUILD_COMMAND,
      {
        cwd: REPO_PATH,
      },
      async (error, stdout, stderr) => {
        if (!error) {
          logger.info('BUILD FINISHED');
          console.timeEnd('build time');
          let syncFinished = await synchronize();
          resolve(syncFinished);
        } else {
          logger.info(stdout);
          logger.error(stderr);
          logger.info('BUILD FAILED');
          console.timeEnd('build time');
          resolve(false);
        }
      }
    );
  });
}

async function synchronize() {
  return new Promise((resolve, reject) => {
    const buildDir = path.join(REPO_PATH, 'public');
    logger.info('STARTED SYNCHRONIZING');
    console.time('synchronize time');
    exec(
      `rsync -aq --delete ${buildDir}/ ${SYNC_DIRECTORY}`,
      {
        cwd: REPO_PATH,
      },
      (error, stdout, stderr) => {
        if (!error) {
          logger.info('SYNCHRONIZING FINISHED');
          console.timeEnd('synchronize time');
          resolve(true);
        } else {
          logger.info(stdout);
          logger.error(stderr);
          logger.info('SYNCHRONIZING FAILED');
          console.timeEnd('synchronize time');
          resolve(false);
        }
      }
    );
  });
}

module.exports = build;
