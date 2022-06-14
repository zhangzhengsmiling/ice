import fs from 'fs';
import path from 'path';
import installPackages from '../common/install-packages';
import jsonFormatter from '../common/json-formatter';

const test = async () => {
  const jsonString = jsonFormatter(2);
  const workspace = process.cwd();
  const pathPkg = path.resolve(workspace, 'package.json');
  const pkgModule = await import(pathPkg);
  const pkg = pkgModule.default;
  installPackages([
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-typescript',
    'babel-jest',
    'jest-environment-jsdom',
    'jest'
  ], ['-D']);

  const jestTempl = fs.readFileSync(
    path.resolve(__dirname, '../templates/jest.config.templ')
  );
  const destJest = path.resolve(workspace, 'jest.config.js');
  const babelTempl = fs.readFileSync(
    path.resolve(__dirname, '../templates/.babelrc.templ')
  );
  const destBabelrc = path.resolve(workspace, '.babelrc.js');
  fs.writeFileSync(destJest, jestTempl);
  fs.writeFileSync(destBabelrc, babelTempl);

  if(!pkg.scripts)
    pkg.scripts = {};
  if (!pkg.scripts.test)
    pkg.scripts.test = 'jest';
  else
    console.log('test命令已被占用，可手动添加script，`jest`');
  fs.writeFileSync(pathPkg, jsonString(pkg));
  console.log('Finished! Hava fun!');
};

export default test;
