const { execSync } = require('child_process');
const { resolve } = require('path');
const BranchName = require('branch-name');
const packages = require('./packageConfiguration');

const ROOT_DIR = resolve(__dirname, '..');

process.chdir(ROOT_DIR);

Object.keys(packages).forEach(async packageName => {
  const configuration = packages[packageName];

  if (!configuration) {
    return;
  }

  const packageDir = resolve(ROOT_DIR, packageName);

  if (
    configuration &&
    configuration.scripts &&
    configuration.scripts['build:static']
  ) {
    execSync(`yarn workspace ${configuration.name} run build:static`);
    process.chdir(packageDir);
    const branchName = await BranchName.get();
    execSync('git checkout gh-pages');
    // execSync('git rm *')
    execSync('git add .');
    execSync('git commit -m "Automated publish"');
    execSync(`git checkout ${branchName}`);
  }
});
