import fs from 'fs';
import path from 'path';
import installPackages from './common/install-packages';
import jsonFormatter from './common/json-formatter';
const workspace = process.cwd();
const pathPkg = path.resolve(workspace, 'package.json');
const pkg = require(pathPkg);
interface IOptions {

  husky: boolean;
  commitizen: boolean;
  commitlint: boolean;
  "standard-version": boolean;
}

const commitizen = () => {

  installPackages(['commitizen', 'cz-conventional-changelog'], ['--dev']);
  if(!pkg.config) {
    pkg.config = {
      "commitizen":{
        "path":"node_modules/cz-conventional-changelog"
      }
    };
  }

  fs.writeFileSync(pathPkg, JSON.stringify(pkg, null, 2));
};

const  husky = () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');

  installPackages(['husky@4.3.6'], ['-D']);
  const pkg = require(pathPkg);
  pkg.husky = {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  };

  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

const commitlint = () => {
  installPackages(['@commitlint/config-conventional','@commitlint/cli'], ['-D']);
  const workspace = process.cwd();

  const commitlintTempl = fs.readFileSync(
    path.resolve(__dirname, '../templates/.commitlint.templ.js')
  ).toString();

  const dest = `${workspace}/.commitlintrc.js`;
  fs.writeFileSync(dest, commitlintTempl);
};

const standardVersion = () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');

  installPackages(['standard-version'], ['-D']);

  const pkg = require(pathPkg);
  if(!pkg.scripts)
    pkg.scripts = {};
  pkg.scripts.release = 'yarn standard-version';
  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

const ci = (options: IOptions) => {
  console.log(options);
  
};

export default ci;
