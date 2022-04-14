import path from 'path';
import fs from 'fs';
import installPackages from "../common/install-packages";
const workspace = process.cwd();

const commitizen = async () => {
  const pathPkg = path.resolve(workspace, 'package.json');
  const pkgModule = await import(pathPkg);
  const pkg = pkgModule.default;
  if(pkg.config) return console.log('commitizen已配置，配置失败');
  installPackages(['commitizen', 'cz-conventional-changelog'], ['--dev']);
  pkg.config = {
    "commitizen":{
      "path":"node_modules/cz-conventional-changelog"
    }
  };
  fs.writeFileSync(pathPkg, JSON.stringify(pkg, null, 2));
};

export default commitizen;