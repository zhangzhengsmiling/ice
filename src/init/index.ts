
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const init = (name: string) => {
  const cwd = process.cwd();
  if (fs.existsSync(path.resolve(cwd, name))) {
    throw new Error(`${name} already exists, please check again...`);
  }
  console.log(`clone repo to ${name}...`);
  const buffer = execSync('git clone git@github.com:zhangzhengsmiling/react-template.git ' + name);
  console.log(buffer.toString())

  console.log('Removing .git files...')
  fs.rmSync(path.resolve(cwd, `./${name}/.git`), {
    recursive: true
  });
  // 修改package.json
  const obj = JSON.parse(fs.readFileSync('package.json').toString());
  obj.name = name;
  fs.writeFileSync('package.json', JSON.stringify(obj, null, 2));
  try {
    console.log('installing packages...(by yarn)')
    execSync(`cd ${name} && yarn`)
    console.log(`Now you can run 'cd ${name} and run yarn dev or npm run dev'`)
    console.log('Have fun!')
  } catch(error) {
    console.log('there is errors when installing dependencies, please retry...');
  }
}

export default init;
