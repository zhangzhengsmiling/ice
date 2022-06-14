import { SwitchCase } from '../utils';
import { commitlint, standardVersion, commitizen, husky, test } from './scripts';
const props = <T>(key: keyof T) => (obj: T) => obj[key];
interface IOptions {
  husky: boolean;
  commitizen: boolean;
  commitlint: boolean;
  standardVersion: boolean;
  test: boolean;
}

const ci = (options: IOptions) => {
  const ciSwitchCase = SwitchCase.of<keyof IOptions, () => Promise<void>>()
    .case('husky', husky)
    .case('commitlint', commitlint)
    .case('commitizen', commitizen)
    .case('standardVersion', standardVersion)
    .case('test', test);
  const tasks = (Object.keys(options) as (keyof IOptions)[])
    .filter(props)
    .map(ciSwitchCase.switch.bind(ciSwitchCase));
  tasks
    .filter(Boolean)
    .forEach(async (task) => {
      await task!();
    });
};

export default ci;
