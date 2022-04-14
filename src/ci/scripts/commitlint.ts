import fs from 'fs';
import path from 'path';
import installPackages from '../common/install-packages';

const commitlint = async () => {
  installPackages(['@commitlint/config-conventional','@commitlint/cli'], ['-D']);
  const workspace = process.cwd();

  const commitlintTempl = fs.readFileSync(
    path.resolve(__dirname, '../templates/.commitlint.templ.js')
  ).toString();

  const dest = `${workspace}/.commitlintrc.js`;
  fs.writeFileSync(dest, commitlintTempl);
};

export default commitlint;