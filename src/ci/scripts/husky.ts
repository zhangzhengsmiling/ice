import fs from 'fs';
import path from 'path';
import jsonFormatter from '../common/json-formatter';
import installPackages from '../common/install-packages';

const  husky = async () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');

  installPackages(['husky@4.3.6'], ['-D']);
  const pkg = await import(pathPkg);
  pkg.husky = {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  };

  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

export default husky;