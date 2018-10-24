const { existsSync, readFileSync } = require('fs');
const { resolve } = require('path');

const ROOT_DIR = resolve(__dirname, '..');

const packages = JSON.parse(readFileSync(resolve(ROOT_DIR, '.meta')).toString())
  .projects;

const configurations = {};
Object.keys(packages).forEach(packageName => {
  const path = resolve(ROOT_DIR, packageName, 'package.json');

  if (!existsSync(path)) {
    configurations[packageName] = null;
    return;
  }

  const configuration = JSON.parse(readFileSync(path));

  configurations[packageName] = configuration;
});

module.exports = configurations;
