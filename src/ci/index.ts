import { SwitchCase } from '../utils';
import { commitlint, standardVersion, commitizen, husky } from './scripts'
const props = <T>(key: keyof T) => (obj: T) => obj[key];
interface IOptions {
  husky: boolean;
  commitizen: boolean;
  commitlint: boolean;
  "standard-version": boolean;
}

const ci = (options: IOptions) => {
  console.log(options);
  const ciSwitchCase = SwitchCase.of<keyof IOptions, () => Promise<void>>()
    .case('husky', husky)
    .case('commitlint', commitlint)
    .case('commitizen', commitizen)
    .case('standard-version', standardVersion);

  (Object.keys(options) as (keyof IOptions)[])
    .filter(props)
    .map(ciSwitchCase.switch);
};

export default ci;
