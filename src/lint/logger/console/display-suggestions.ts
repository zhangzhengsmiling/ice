import { Linter } from 'eslint';
import chalk from 'chalk';
import { logger } from '../../utils';

const { space } = logger;

export const displaySuggestions = (msg: Linter.LintMessage) => {
  const message = new Array<string>()
    .concat(space(2))
    .concat(chalk.green('suggestions:'))
    .join('');
  console.log(message);
  msg.suggestions
    ?.map(
      suggest => 
      new Array<string>()
        .concat(chalk.green(space(4)))
        .concat(chalk.green(suggest.desc))
        .join('')
    )
    .map(console.log);
};
