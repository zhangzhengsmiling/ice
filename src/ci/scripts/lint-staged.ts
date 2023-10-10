import fs from 'fs';
import path from 'path';
import installPackages from "../common/install-packages";
import jsonFormatter from "../common/json-formatter";

const lintStaged = async () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');

  installPackages(['lint-staged'], ['-D']);

  const pkgModule = await import(pathPkg);
  const pkg = pkgModule.default;
  if (!pkg['lint-staged']) {
    pkg['lint-staged'] = {
      "*.[tj]s?(x)": [
        "ice lint --fix",
        "prettier --write",
        "git add ."
      ]
    };
  } else {
    console.log('配置失败：lint-staged已配置');
  }
  if(!pkg.scripts)
    pkg.scripts = {};
  // 配置lint命令
  if (!pkg.scripts.lint) {
    pkg.scripts.lint = 'lint-staged';
  } else {
    console.log('lint命令已被占用，可手动添加script，`lint-staged`');
  }
  // 配置lint-all命令
  if (!pkg.scripts['lint-all']) {
    pkg.scripts['lint-all'] = 'ice lint src --ext .ts,.tsx,.js,.jsx';
  } else {
    console.log('lint-all命令已被占用，可手动添加script，`eslint src --ext .ts,.tsx,.js,.jsx`');
  }
  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

export default lintStaged;

