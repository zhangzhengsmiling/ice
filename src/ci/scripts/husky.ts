import fs from 'fs';
import path from 'path';
import jsonFormatter from '../common/json-formatter';
import installPackages from '../common/install-packages';

const  husky = async () => {
  const jsonStringify = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');
  const pkgModule = await import(pathPkg);
  const pkg = pkgModule.default;
  if(pkg.devDependencies.husky || pkg.dependencies.husky)
    return console.warn('已安装husky包，配置husky失败。如果想要继续安装，请手动移除husky依赖后重试');
  
  installPackages(['husky@4.3.6'], ['-D']);  
  if (pkg.husky) return console.warn('已有husky配置');
    pkg.husky = {
      "hooks": {
        "commit-msg": "commitlint -e $GIT_PARAMS"
      }
    };

  fs.writeFileSync(pathPkg, jsonStringify(pkg));
};

export default husky;