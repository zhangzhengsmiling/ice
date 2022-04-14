import fs from 'fs';
import path from 'path';
import installPackages from "../common/install-packages";
import jsonFormatter from "../common/json-formatter";

const standardVersion = async () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');

  installPackages(['standard-version'], ['-D']);

  const pkgModule = await import(pathPkg);
  const pkg = pkgModule.default;
  if(!pkg.scripts)
    pkg.scripts = {};
  if (!pkg.scripts.release)
    pkg.scripts.release = 'yarn standard-version';
  else
    console.log('release命令已被占用，可手动添加script，`yarn standard-version`');
  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

export default standardVersion;