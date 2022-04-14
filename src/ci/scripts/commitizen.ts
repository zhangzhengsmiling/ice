import path from 'path';
import fs from 'fs';
import installPackages from "../common/install-packages";
const workspace = process.cwd();

const commitizen = async () => {
  installPackages(['commitizen', 'cz-conventional-changelog'], ['--dev']);
  const pathPkg = path.resolve(workspace, 'package.json');
  const pkg = await import(pathPkg);
  if(!pkg.config) {
    pkg.config = {
      "commitizen":{
        "path":"node_modules/cz-conventional-changelog"
      }
    };
  }
  fs.writeFileSync(pathPkg, JSON.stringify(pkg, null, 2));
};

export default commitizen;