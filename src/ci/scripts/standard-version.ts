import fs from 'fs';
import path from 'path';
import installPackages from "../common/install-packages";
import jsonFormatter from "../common/json-formatter";

const standardVersion = async () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');

  installPackages(['standard-version'], ['-D']);

  const pkg = await import(pathPkg);
  if(!pkg.scripts)
    pkg.scripts = {};
  pkg.scripts.release = 'yarn standard-version';
  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

export default standardVersion;