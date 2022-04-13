import child_process from 'child_process';
const { execSync } = child_process;

const installPackages = (packages: string[], options: string[] = []) => {
  if(!packages || packages.length === 0) throw new Error('packages is required!');
  const script = `yarn add ${packages.join(' ')} ${options.join(' ')}`;
  execSync(script, {stdio: [0, 1, 2]});
};

export default installPackages;