const exec = require('child_process').exec;

const dependencies = [
  {
    name: 'npm',
    command: 'npm help',
  },
  {
    name: 'rsync',
    command: 'rsync --help',
  },
];

/**
 * Checks that the dependencies listed in `dependencies` exist in a linux
 * machine.
 *
 * @throws {Error} - Throws an error listing the missing dependencies if
 *    dependency was not found.
 */
async function checkDependencies() {
  const missingDependencies = [];

  for (const dep of dependencies) {
    let hasDependency = await findProgram(dep.command);
    if (!hasDependency) {
      missingDependencies.push(dep.name);
    }
  }

  if (missingDependencies.length > 0) {
    throw new Error(`missing dependencies: ${missingDependencies.join(', ')}`);
  }

  return true;
}

async function findProgram(command) {
  return new Promise(resolve => {
    exec(`command -p ${command}`, error => {
      if (error) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

module.exports = checkDependencies;
